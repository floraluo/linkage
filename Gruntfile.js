module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {                       // Target options
	        style: 'expanded'
	      },
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['*.sass'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},
    autoprefixer: {
    	options: {
		  	browsers: ['last 5 versions', 'ie 8' , 'ie 9']
			},
	    dist: {
				files: [{
					expand: true,
					cwd: 'dist/css/',
					src: ['*.css'],
					dest: 'dist/css/'
				}]
	    }
  	},
    htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					// expand: true,
					cwd: 'src/**/',
					src: ['*.html'],
					dest: 'dist/',
					ext: '.html'
				}]
			},
			dev: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.html'],
					dest: 'dist/',
					ext: '.html'
				}]
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
			dev: {
				files: [{
					expand: true,
					cwd: 'src/js/',
					src: ['*.js'],
					dest: 'dist/js/',
					ext: '.js'
				}]
			}
		},
		watch: {
      sass: {
      	files: ['src/sass/**/*.{scss,sass}'],
      	tasks: ['sass']
      },
      autoprefixer: {
      	files: ['src/build/*.css'],
      	tasks: ['autoprefixer']
      },
      html: {
      	files: ['src/**/*.html'],
      	tasks: ['htmlmin:dev']
      }
    }
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass' , 'autoprefixer' , 'htmlmin:dev']);
}