module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("grunt-env");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-jasmine-nodejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks("grunt-karma");

	var config = {
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			options: {
				ecmaFeatures: {
					modules: true
				},
				ignorePath: ".eslintignore",
				/* http://eslint.org/docs/rules/ */
				rules: {
					eqeqeq: 0,
					curly: 2,
					quotes: [2, "double"],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"no-unused-vars": 1
				},
				envs: ["browser", "node", "jasmine"]
			},
			client: ["suites/client/**/*.js", "client/**/*.js"],
			server: ["suites/server/**/*.js", "server/**/*.js"],
			suites: ["suites/**/*.js"]
		},
		clean: {
			core: ["client/strife.js", "client/strife.css"]
		},
		concat: {
			clientjs: {
				src: ["client/library/angular.js","client/library/jquery.js","client/scripts/**/*.js"],
				dest: "client/lcars.js"
			},
			clientcs: {
				src: ["client/**/*.css"],
				dest: "client/lcars.css"
			}
		},
		connect: {
			server: {
				options: {
					port: 3080,
					base: "client/",
					hostname: "localhost",
					livereload: 3081
				}
			}
		},
		open : {
			dev : {
				path: "http://127.0.0.1:3080/"
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: false,
			},
			client: {
				files: {
					"client/lcars.js": ["client/lcars.js"]
				}
			}
		},
		watch: {
			client: {
				options: {
					livereload: {
						host: "localhost",
						port: 3081
					},
					livereloadOnError: false
				},
				files: ["client/scripts/**/*.js", "client/styles/**/*.css", "client/**/*.html", "client/*.html"],
				tasks: ["core", "dev"]
			}
		},
		jasmine_nodejs: {
			options: {
				specNameSuffix: "-test.js",
				helperNameSuffix: "-assist.js",
				useHelpers: true,
				stopOnFailure: true,
				reporters: {
					console: {
						colors: true,        // (0|false)|(1|true)|2
						cleanStack: 1,       // (0|false)|(1|true)|2|3
						verbosity: 4,        // (0|false)|1|2|3|(4|true)
						listStyle: "indent", // "flat"|"indent"
						activity: false
					},
					junit: {
						savePath : "./suites/reports/",
						filePrefix: "report-",
						useDotNotation: true,
						consolidate: false
					}
				}
			},
			unit: {
				specs: "./suites/unit/**",
				helpers: ["./suites/assist/**"]
			},
			integration: {
				specs: "./suites/integration/**",
				helpers: ["./suites/assist/**"]
			},
			functional: {
				specs: "./suites/functional/**",
				helpers: ["./suites/assist/**"]
			}
		},
		yuidoc: {
			compile: {
				name: "<%= pkg.name %>",
				description: "<%= pkg.description %>",
				version: "<%= pkg.version %>",
				url: "<%= pkg.homepage %>",
				options: {
					paths: ["./client/scripts/"],
					outdir: "./documentation",
					exclude: "**/angular.js, **/jquery.js",
					markdown: true
				}
			}
		},
		uglify: {
			client: {
				files: {
					"./client/lcars.js": ["./client/lcars.js"]
				}
			}
		},
		karma: {
			options: {
				reporters: ["spec", "junit", "html"],
				frameworks: ["jasmine"],
				singleRun: true,
				browsers: ["PhantomJS", "Firefox", "IE", "Chrome"],
				junitReporter: {
					outputDir: "./reports/jasmine", // results will be saved as $outputDir/$browserName.xml
					outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
					suite: "", // suite will become the package name attribute in xml testsuite element
					useBrowserName: true, // add browser name to report and classes names
					nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
					classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
					properties: {} // key value pair of properties to add to the <properties> section of the report
				},
				htmlReporter: {
					outputFile: "reports/general.html"
				},
				/*logLevel: "debug",*/
				files: [
					"client/scripts/angular.js",
					"client/scripts/jquery.js",
					"client/scripts/core.js",
					"client/scripts/start.js",
					"shims/angular-shim.js",
					]
			},
			unit: {
				singleRun: false,
			},
			continuous: {
				singleRun: false
			},
			backgroundUnit: {
				background: false,
				autoWatch: false
			}
		},
	};
	
	grunt.initConfig(config);

	grunt.registerTask("lint", ["eslint:client"]);
	grunt.registerTask("unit", ["eslint:client", "jasmine_nodejs:unit"]);
	grunt.registerTask("integration", ["eslint:client", "jasmine_nodejs:integration"]);
	grunt.registerTask("functional", ["eslint:client", "jasmine_nodejs:functional"]);
	grunt.registerTask("test", ["eslint:client", "tests"]);
	grunt.registerTask("tests", "jasmine_nodejs:unit", "jasmine_nodejs:integration", "jasmine_nodejs:functional"]);
	grunt.registerTask("doc", ["eslint:client", "yuidoc"]);
	grunt.registerTask("dev", ["eslint:client", "concat:clientjs", "concat:clientcs"]);
	grunt.registerTask("prod", ["dev", "ngAnnotate:client", "uglify:client"]);
	grunt.registerTask("client", ["dev", "jasmine_nodejs:unit", "connect", "open", "watch:client"]);

	grunt.registerTask("lint", ["eslint:server", "eslint:client"]);

	grunt.registerTask("default", "test");
};
