module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("grunt-env");
	grunt.loadNpmTasks("grunt-eslint");
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
				globals: [
							"window",
							"location",
							"document",
							"angular",
							"inject",
							"module",
							"localStorage",
							"sessionStorage",
							"Highcharts",
							"Cytoscape",
							"$"
						],
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
			client: ["client/scripts/**/*.js", "suites/*/**/*.js"]
		},
		concat: {
			clientjs: {
				src: ["node_modules/angular/angular.js",
				      "node_modules/jquery/dist/jquery.js",
				      "node_modules/angular-route/angular-route.js",
				      "node_modules/angular-utils-pagination/dirPagination.js",
				      "client/library/*.js",
				      "client/scripts/modules/*.js",
				      "client/scripts/configuration/*.js",
				      "client/scripts/configuration/*.js",
				      "client/scripts/providers/*.js",
				      "client/scripts/filters/*.js",
				      "client/scripts/directives/*.js",
				      "client/scripts/controllers/*.js",
				      "client/scripts/services/*.js"],
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
			},
			docs: {
				options: {
					port: 3090,
					base: "docs/",
					hostname: "localhost"
				}
			}
		},
		templify: {
			testing: {
				templates: [{
					path: "client/templates/",
					rewrite: function(path) {
						return path.substring(path.lastIndexOf("/") + 1);
					}
				}],
				suffixes: [".html"],
				mode: "karma-angular",
				output: "../../client/templates.js"
			}
		},
		open : {
			client : {
				path: "http://127.0.0.1:3080/index.html"
			},
			docs : {
				path: "http://127.0.0.1:3090/index.html"
			},
			karma: {
				path: "http://127.0.0.1:5060/"
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
				tasks: ["dev"]
			},
			docs: {
				files: ["client/scripts/**/*.js", "client/styles/**/*.css", "client/**/*.html", "client/*.html"],
				tasks: ["yuidoc"]
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
				reporters: ["spec", "junit", "live-html"],
				frameworks: ["jasmine"],
				singleRun: true,
				browsers: ["PhantomJS", "Firefox", "Chrome"],
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
					outputFile: "./reports/general.html"
				},
				htmlLiveReporter: {
					colorScheme: "jasmine", // light 'jasmine' or dark 'earthborn' scheme
					defaultTab: "summary", // 'summary' or 'failures': a tab to start with
					// only show one suite and fail log at a time, with keyboard navigation
					focusMode: true,
				},
				specReporter: {
					maxLogLines: 1,         // limit number of lines logged per test 
					suppressErrorSummary: true,  // do not print error summary 
					suppressFailed: false,  // do not print information about failed tests 
					suppressPassed: false,  // do not print information about passed tests 
					suppressSkipped: true,  // do not print information about skipped tests 
					showSpecTiming: false // print the time elapsed for each spec 
				},
				/*logLevel: "debug",*/
				files: ["node_modules/angular/angular.js",
	        			"node_modules/angular-mocks/angular-mocks.js",
					    "node_modules/jquery/dist/jquery.min.js",
	        			"suites/support/*.js",
	    				"scenarios/data/*.js",
						"client/templates.js",
						"client/scripts/modules/*.js",
						"client/scripts/configuration/*.js",
						"client/scripts/controllers/*.js",
						"client/scripts/directives/*.js",
						"client/scripts/providers/*.js",
						"client/scripts/services/*.js",
						"client/scripts/filters/*.js",
						"suites/unit/*.js"]
			},
			unit: {
				/*
				files: ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/unit/*.js"],
						*/
				singleRun: true,
			},
			integration: {
				/*
				files: ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/integration/*.js"],
						*/
				singleRun: true,
			},
			functional: {
				/*
				files: ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/functional/*.js"],
						*/
				singleRun: true,
			},
			continuous: {
				/*
				files: ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/unit/*.js"],
						*/
				singleRun: false
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
					outdir: "./docs",
					exclude: "**/angular.js, **/jquery.js",
					markdown: true
				}
			}
		},
		concurrent: {
			development: {
				tasks: [
						/*Docs*/ ["document"],
						/*Test*/ ["testing"],
						/*Run */ ["general"],
				],
				options: {
					logConcurrentOutput: true
				}
			}
        }
	};

	if(process.argv.indexOf("headless") !== -1) {
		config.karma.options.browsers = ["PhantomJS"];
	}
	
	grunt.initConfig(config);
	
	grunt.registerTask("default", ["lint", "concurrent:development"]);

	grunt.registerTask("lint", ["eslint:client"]);
	grunt.registerTask("dev", ["eslint:client", "concat:clientjs", "concat:clientcs"]);
	grunt.registerTask("prod", ["dev", "ngAnnotate:client", "uglify:client"]);

	grunt.registerTask("headless", []);

	grunt.registerTask("document", ["eslint:client", "yuidoc", "connect:docs", "open:docs", "watch:docs"]);
	grunt.registerTask("general", ["dev", "connect:server", "open:client", "watch:client"]);
	grunt.registerTask("testing", ["templify:testing", "open:karma", "karma:continuous"]);
};
