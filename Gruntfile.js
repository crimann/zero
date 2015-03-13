module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			build: {
				src: [
					'js/src/**/*.js'
				],
				dest: 'js/<%= pkg.name %>.js'
			}
		},

		uglify: {
			build: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'js/<%= pkg.name %>.min.js',
			},
		},

		sass: {
			maximized: {
				options: {
					style: 'expanded',
					quiet: true
				},
				files: {
					'css/style.max.css': 'scss/main.scss'
				}
			},
			minified: {
				options: {
					style: 'compressed',
					quiet: true
				},
				files: {
					'css/style.min.css': 'scss/main.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'last 4 versions',
					'ie 9',
					'ios 6',
					'android 4'
				]
			},
			style: {
				src: 'css/*.css'
			}
		},

		respimg: {
			options: {
				widths: [
					320,
					640,
					1280
				]
			},
			default: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**.{gif,jpg,png,svg}'],
					dest: 'images/'
				}]
				// Target-specific file lists go here. 
			}
		},

		rsync: {
			options: {
				args: ["--verbose"],
				exclude: [
					'.git',
					'.gitignore',
					'.DS_Store',
					'style.max.css',
					'*.css.map',
					'<%= pkg.name %>.js',
					'js/src',
					'node_modules',
					'src',
					'scss',
					'Gruntfile.js',
					'package.json',
					'.sass-cache',
					'<%= pkg.name %>'
				],
				recursive: true
			},
			dist: {
				options: {
					src: "./",
					dest: "<%= pkg.name %>",
					delete: true
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			php: {
				files: ['*.php', '*.html'],
			},
			scripts: {
				files: ['js/src/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				},
			},

			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					spawn: false
				}
			},
		}

	});

	// Load the required Plugins for our tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-respimg');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-rsync');

	// Define default task(s).
	grunt.registerTask(
		'default',
		[
			'sass',
			'autoprefixer',
			'scripts',
			'watch'
		]
	);

	// Define Task to concatenate and uglify only the Javascripts
	grunt.registerTask(
		'scripts',
		[
			'concat',
			'uglify'
		]
	);

	// Define Task to create image versions
	grunt.registerTask(
		'images',
		[
			'respimg'
		]
	);

	// Define the final Build/Deploy Task to write the final Theme for distribution
	grunt.registerTask(
		'build',
		[
			'sass',
			'autoprefixer',
			'concat',
			'uglify',
			'respimg',
			'rsync'
		]
	);
};
