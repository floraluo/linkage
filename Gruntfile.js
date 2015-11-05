module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    compass: {
	    	dev: {
	    		options: {
	    			relativeAssets: true,
	    			sassDir: 'src/sass',
	    			cssDir: 'src/build',
	    			imagesDir: 'src/images'
	    		}
	    	},
	    	prod: {
	    		options: {
	    			relativeAssets: true,
	    			sassDir: 'src/sass',
	    			cssDir: 'src/build',
	    			imagesDir: 'src/images',
	    			environment: 'production'
	    		}
	    	}
	    },
	    cssmin: {
	    	minify: {
	    		files: [{
	    			expand: true,
	    			cwd: 'src/css/',
	    			// src: ['*.css', '!*.min.css','!stock.css','!common.css','!main.css','!page.css'],
	    			src: ['*.css'],
	    			dest: 'dist/css',
	    			ext: '.min.css'
	    		}]
	    	}
	    },
	    autoprefixer: {
	    	options: {
			  	browsers: ['last 5 versions', 'ie 8' , 'ie 9']
			},
		    dist: {
		      	// Target-specific file lists and/or options go here. 
		      	// files : { 
		      	// 	['src/css/indexf.css': 'src/build/indexf.css' ],
		      	// 	['src/css/index.css': 'src/build/index.css']
		      	// }
		      	files: [{
                    expand: true,
                    cwd: 'src/build/',
                    src: ['*.css'],
                    dest: 'src/css/'
                }]
		    }
	  	},
	    htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                             // Dictionary of files
					'dist/index.html': 'src/index.html',
					'dist/fixed.html': 'src/fixed.html'
				}
				// files: [{
				// 	src: ['settled.html'],
				// 	dest: ['settled.html']
				// }]
			},
			dev: {                                       // Another target
				files: {
					// 'dist/index.html': 'src/index.html',
					'dist/index.html': 'src/index.html',
					'dist/fixed.html': 'src/fixed.html'
				}
			}
		},
	    imagemin: {
	    	dist: {
                options: {
                    optimizationLevel: 5 
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
	    },
	    uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				files: {
				'dist/js/indexf.min.js': ['src/js/indexf.js']
				}
			}
		},
		watch: {
	      compass: {
	      	files: ['src/**/*.{scss,sass}'],
	      	tasks: ['compass:dev']
	      },
	      autoprefixer: {
	      	files: ['src/build/*.css'],
	      	tasks: ['autoprefixer']
	      },
	      css: {
	      	files: ['src/css/*.css'],
	      	tasks: ['cssmin']
	      },
	      html: {
	      	files: ['src/*.html'],
	      	tasks: ['htmlmin']
	      },
	      js: {
	      	files: ['src/js/*.js'],
	      	tasks: ['uglify']
	      }
	    }
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['compass' , 'autoprefixer' , 'cssmin' , 'htmlmin:dist' , 'uglify' , 'imagemin']);
}