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
		"pkg": grunt.file.readJSON("package.json"),
		"eslint": {
			"options": {
				"ecmaFeatures": {
					"modules": true
				},
				"ignorePath": ".eslintignore",
				/* http://eslint.org/docs/rules/ */
				"globals": [
					"sessionStorage",
					"localStorage",
					"cytoscape",
					"window",
					"location",
					"document",
					"angular",
					"inject",
					"module",
					"cola",
					"$",
					"d3"
				],
				"rules": {
					"eqeqeq": 0,
					"curly": 2,
					"quotes": [2, "double"],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"no-unused-vars": 1
				},
				"terminateOnCallback": false,
				"callback": function(response) {
					if(response.errorCount) {
						var result, message;
						for(result=response.results.length-1; result !== -1; --result) {
							if(!response.results[result].errorCount) {
								response.results.splice(result,1);
							} else {
								for(message=response.results[result].messages.length-1; message !== -1; --message) {
									if(response.results[result].messages[message].severity !== 2) {
										response.results[result].messages.splice(message,1);
									}
								}
							}
						}
					}
					return response;
				},
				"envs": ["browser", "node", "jasmine"]
			},
			"client": ["client/angularjs-scripts/**/*.js",
			         "suites/integration/**/*.js",
			         "suites/unit/**/*.js",
			         "suites/functional/**/*.js"]
		},
		"concat": {
			"clientcs": {
				"src": ["client/styles/*.css",
					"client/styles/**/*.css"],
				"dest": "client/lcars.css"
			},
			"clientjs": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "client/lcars.map"
				},
				"src": [
				      "client/library/*.js",
				      "client/angularjs-scripts/modules/*.js",
				      "client/angularjs-scripts/configuration/*.js",
				      "client/angularjs-scripts/configuration/*.js",
				      "client/angularjs-scripts/providers/*.js",
				      "client/angularjs-scripts/filters/*.js",
				      "client/angularjs-scripts/factory/*.js",
				      "client/angularjs-scripts/directives/*.js",
				      "client/angularjs-scripts/controllers/*.js",
				      "client/angularjs-scripts/services/*.js",
				      "client/vue-scripts/**/*.js"
				],
				"dest": "client/lcars.js"
			},
			"client": {
				"src": ["node_modules/angular/angular.min.js",
					  "node_modules/vue/dist/vue.min.js",
				      "node_modules/jquery/dist/jquery.js",
				      "node_modules/angular-route/angular-route.js",
				      "node_modules/angular-utils-pagination/dirPagination.js",
				      "node_modules/cytoscape/dist/cytoscape.js",
				      "node_modules/cytoscape-cola/cola.js",
				      "node_modules/cytoscape-cola/cytoscape-cola.js",
				      "client/lcars.js"],
				"dest": "client/lcars.js"
			},
			"angularjs": {
				"src": [
				      "client/angularjs-scripts/modules/*.js",
				      "client/angularjs-scripts/configuration/*.js",
				      "client/angularjs-scripts/configuration/*.js",
				      "client/angularjs-scripts/providers/*.js",
				      "client/angularjs-scripts/filters/*.js",
				      "client/angularjs-scripts/factory/*.js",
				      "client/angularjs-scripts/directives/*.js",
				      "client/angularjs-scripts/controllers/*.js",
				      "client/angularjs-scripts/services/*.js"],
				"dest": "dist/lcars-angular.js"
			},
			"vuejs": {
				"src": [
				      "client/vue-scripts/modules/*.js",
				      "client/vue-scripts/configuration/*.js",
				      "client/vue-scripts/configuration/*.js",
				      "client/vue-scripts/providers/*.js",
				      "client/vue-scripts/filters/*.js",
				      "client/vue-scripts/factory/*.js",
				      "client/vue-scripts/directives/*.js",
				      "client/vue-scripts/controllers/*.js",
				      "client/vue-scripts/services/*.js"],
				"dest": "dist/lcars-vue.js"
			},
			"distributeAngular": {
				"src": [
				      "node_modules/cytoscape/dist/cytoscape.min.js",
				      "node_modules/cytoscape-cola/cola.js",
				      "node_modules/cytoscape-cola/cytoscape-cola.js",
				      "client/library/*.js",
				      "dist/lcars-angular.min.js"],
				"dest": "dist/lcars-angular.min.js"
			},
			"distributeVue": {
				"src": [
				      "node_modules/cytoscape/dist/cytoscape.min.js",
				      "node_modules/cytoscape-cola/cola.js",
				      "node_modules/cytoscape-cola/cytoscape-cola.js",
				      "client/library/*.js",
				      "dist/lcars-vue.min.js"],
				"dest": "dist/lcars-vue.min.js"
			},
			"distributeCSS": {
				"src": ["client/styles/*.css",
					"client/styles/**/*.css"],
				"dest": "dist/lcars.css"
			}
		},
		"connect": {
			"server": {
				"options": {
					"port": 3080,
					"base": "client/",
					//hostname: "localhost",	// Allow only from localhost
					"hostname": "*",				// Allow from anywhere
					"livereload": 3081,
					"middleware": function(connect, options, middlewares) {
	                    middlewares.unshift(function(req, res, next) {
	                        res.setHeader("Access-Control-Allow-Origin", "*");
	                        res.setHeader("Content-Security-Policy",
	                        		"default-src " +
		                        		"'self' " +
		                        		"ws://127.0.0.1:3081/livereload " +
		                        		"ws://192.168.13.40:3081 " +
		                        		"ws://192.168.13.40:3081/livereload " +
		                        		"ws://localhost:3081  " +
		                        		"http://127.0.0.1:3081 " +
		                        		"http://localhost:3081 " +
		                        		"http://192.168.13.40:3081 " +
		                        		"wss://tower.refugesystems.net:3000 " +
		                        		"http://d3js.org " +
		                        		"'unsafe-inline' " +
		                        		"'unsafe-eval'; " +
	                        		"media-src " +
		                        		"'self' " +
		                        		"http://localhost:3081 " +
		                        		"blob: " +
		                        		"data:; " +
		                        	"script-src " +
		                        		"'self' " +
		                        		"http://127.0.0.1:3081 " +
		                        		"http://localhost:3081 " +
		                        		"http://192.168.13.40:3081 " +
		                        		"http://192.168.13.40:3081/livereload " +
		                        		"http://192.168.13.40:3081/livereload.js " +
		                        		"'unsafe-inline' " +
		                        		"'unsafe-eval' " +
		                        		"blob: " +
		                        		"data: " +
	                        		";");
	                        next();
	                    });
	                    return middlewares;
	                }
				}
			},
			"docs": {
				"options": {
					"port": 3090,
					"base": "docs/",
					"hostname": "localhost"
				}
			}
		},
		"templify": {
			"testing": {
				"templates": [{
					"path": "client/templates/",
					"rewrite": function(path) {
						return path.substring(path.lastIndexOf("/") + 1);
					}
				}],
				"suffixes": [".html"],
				"mode": "karma-angular",
				"output": "../../client/templates.js"
			}
		},
		"open": {
			"client": {
				"path": "http://127.0.0.1:3080/"
			},
			"docs": {
				"path": "http://127.0.0.1:3090/"
			},
			"karma": {
				"path": "http://127.0.0.1:5060/"
			}
		},
		"ngAnnotate": {
			"options": {
				"singleQuotes": false,
			},
			"client": {
				"files": {
					"client/lcars.js": ["client/lcars.js"]
				}
			}
		},
		"watch": {
			"client": {
				"options": {
					"livereload": {
						"host": "0.0.0.0",
						"port": 3081
					},
					"livereloadOnError": false
				},
				"files": ["client/angularjs-scripts/**/*.js", "client/vue-scripts/**/*.js", "client/styles/**/*.css", "client/**/*.html", "client/*.html"],
				"tasks": ["dev"]
			},
			"docs": {
				"files": ["client/angularjs-scripts/**/*.js", "client/vue-scripts/**/*.js", "client/styles/**/*.css", "client/**/*.html", "client/*.html"],
				"tasks": ["yuidoc"]
			}
		},
		"uglify": {
			"client": {
				"files": {
					"./client/lcars.js": ["./client/lcars.js"]
				}
			},
			"angular": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "./dist/angularModule.map"
				},
				"files": {
					"./dist/angularModule.js": [
					      "client/angularjs-scripts/modules/*.js",
					      "client/angularjs-scripts/configuration/*.js",
					      "client/angularjs-scripts/configuration/*.js",
					      "client/angularjs-scripts/providers/*.js",
					      "client/angularjs-scripts/filters/*.js",
					      "client/angularjs-scripts/factory/*.js",
					      "client/angularjs-scripts/directives/*.js",
					      "client/angularjs-scripts/controllers/*.js",
					      "client/angularjs-scripts/services/*.js"]
				}
			},
			"vue": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "./dist/vueModule.map"
				},
				"files": {
					"./dist/vueModule.js": [
					      "client/vue-scripts/modules/*.js",
					      "client/vue-scripts/configuration/*.js",
					      "client/vue-scripts/configuration/*.js",
					      "client/vue-scripts/providers/*.js",
					      "client/vue-scripts/filters/*.js",
					      "client/vue-scripts/factory/*.js",
					      "client/vue-scripts/directives/*.js",
					      "client/vue-scripts/controllers/*.js",
					      "client/vue-scripts/services/*.js"]
				}
			},
			"distribution": {
				"files": {
					"./dist/lcars-angular.min.js": ["./dist/lcars-angular.js"],
					"./dist/lcars-vue.min.js": ["./dist/lcars-vue.js"]
				}
			}
		},
		"karma": {
			"options": {
				"frameworks": ["jasmine"],
				"singleRun": true,
				"junitReporter": {
					"outputDir": "./reports/jasmine", // results will be saved as $outputDir/$browserName.xml
					"outputFile": undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
					"suite": "", // suite will become the package name attribute in xml testsuite element
					"useBrowserName": true, // add browser name to report and classes names
					"nameFormatter": undefined, // function (browser, result) to customize the name attribute in xml testcase element
					"classNameFormatter": undefined, // function (browser, result) to customize the classname attribute in xml testcase element
					"properties": {} // key value pair of properties to add to the <properties> section of the report
				},
				"specReporter": {
					"maxLogLines": 1,         // limit number of lines logged per test 
					"suppressErrorSummary": true,  // do not print error summary 
					"suppressFailed": false,  // do not print information about failed tests 
					"suppressPassed": false,  // do not print information about passed tests 
					"suppressSkipped": true,  // do not print information about skipped tests 
					"showSpecTiming": false // print the time elapsed for each spec 
				},
				/*logLevel: "debug",*/
				"files": ["node_modules/angular/angular.js",
	        			"node_modules/angular-mocks/angular-mocks.js",
	        			"node_modules/angular-mocks/angular-mocks.js",
					    "node_modules/jquery/dist/jquery.min.js",
	        			"suites/support/*.js",
	    				"scenarios/data/*.js",
						"client/templates.js",
						"client/angularjs-scripts/modules/*.js",
						"client/angularjs-scripts/configuration/*.js",
						"client/angularjs-scripts/controllers/*.js",
						"client/angularjs-scripts/directives/*.js",
						"client/angularjs-scripts/providers/*.js",
						"client/angularjs-scripts/services/*.js",
						"client/angularjs-scripts/filters/*.js",
						"suites/unit/*.js"]
			},
			"unit": {
				/*
				"files": ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/unit/*.js"],
						*/
				"singleRun": true,
				"browsers": ["PhantomJS", "Chrome"],
				"htmlReporter": {
					"outputFile": "./reports/general.html"
				},
				"htmlLiveReporter": {
					"colorScheme": "jasmine", // light 'jasmine' or dark 'earthborn' scheme
					"defaultTab": "summary", // 'summary' or 'failures': a tab to start with
					// only show one suite and fail log at a time, with keyboard navigation
					"focusMode": true,
				}
			},
			"integration": {
				/*
				"files": ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/integration/*.js"],
						*/
				"singleRun": true,
				"reporters": ["spec", "junit", "live-html"],
				"browsers": ["PhantomJS", "Chrome"],
				"htmlReporter": {
					"outputFile": "./reports/general.html"
				},
				"htmlLiveReporter": {
					"colorScheme": "jasmine", // light 'jasmine' or dark 'earthborn' scheme
					"defaultTab": "summary", // 'summary' or 'failures': a tab to start with
					// only show one suite and fail log at a time, with keyboard navigation
					"focusMode": true,
				}
			},
			"functional": {
				/*
				"files": ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/functional/*.js"],
						*/
				"singleRun": true,
				"reporters": ["spec", "junit", "live-html"],
				"browsers": ["PhantomJS", "Chrome"],
				"htmlReporter": {
					"outputFile": "./reports/general.html"
				},
				"htmlLiveReporter": {
					"colorScheme": "jasmine", // light 'jasmine' or dark 'earthborn' scheme
					"defaultTab": "summary", // 'summary' or 'failures': a tab to start with
					// only show one suite and fail log at a time, with keyboard navigation
					"focusMode": true,
				}
			},
			"continuous": {
				/*
				"files": ["node_modules/angular/angular.min.js",
					    "node_modules/jquery/dist/jquery.min.js",
						"client/templates.js",
						"client/lcars.js",
						"node_modules/angular-mocks/angular-mock.js",
						"suites/unit/*.js"],
						*/
				"singleRun": false,
				"reporters": ["spec", "junit", "live-html"],
				"browsers": ["PhantomJS", "Chrome"],
				"htmlReporter": {
					"outputFile": "./reports/general.html"
				},
				"htmlLiveReporter": {
					"colorScheme": "jasmine", // light 'jasmine' or dark 'earthborn' scheme
					"defaultTab": "summary", // 'summary' or 'failures': a tab to start with
					// only show one suite and fail log at a time, with keyboard navigation
					"focusMode": true,
				}
			},
			"deployment": {
				"reporters": ["spec", "junit"],
				"browsers": ["PhantomJS"],
				"singleRun": true,
				"htmlReporter": null,
				"htmlLiveReporter": null
			}
		},
		"yuidoc": {
			"compile": {
				"name": "<%= pkg.name %>",
				"description": "<%= pkg.description %>",
				"version": "<%= pkg.version %>",
				"url": "<%= pkg.homepage %>",
				"options": {
					"paths": ["./client/angularjs-scripts/"],
					"outdir": "./docs",
					"exclude": "**/angular.js, **/jquery.js",
					"markdown": true
				}
			}
		},
		"concurrent": {
			"development": {
				"tasks": [
						/*Docs*/ ["document"],
						/*Test*/ ["testing"],
						/*Run */ ["general"],
				],
				"options": {
					"logConcurrentOutput": true
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
	grunt.registerTask("dev", ["eslint:client", "concat:clientjs", "concat:client", "concat:clientcs"]);
	grunt.registerTask("prod", ["dev", "ngAnnotate:client", "uglify:client"]);

	grunt.registerTask("headless", []);

	grunt.registerTask("local", ["default"]);
	grunt.registerTask("document", ["eslint:client", "yuidoc", "connect:docs", "open:docs", "watch:docs"]);
	grunt.registerTask("general", ["dev", "connect:server", "open:client", "watch:client"]);
	grunt.registerTask("testing", ["templify:testing", "open:karma", "karma:continuous"]);
	grunt.registerTask("test", ["eslint:client", "templify:testing", "karma:deployment"]);
	
//	grunt.registerTask("distribute", ["concat:angularjs", "concat:vuejs", "uglify:distribution", "concat:distributeAngular", "concat:distributeVue", "concat:distributeCSS"]);
	grunt.registerTask("distribute", ["uglify:angular", "uglify:vue", "concat:distributeCSS"]);
};
