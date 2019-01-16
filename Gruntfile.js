module.exports = function(grunt) {
  process.execArgv = [];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'frontend/specs/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    protractor: {
      options: {
        configFile: "frontend/conf.js",
        directConnect: true
      },

      // *** DESKTOP TASKS *** //
      elements: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "frontend/conf.js",
          }
        }
      },
      login: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "frontend/conf.js",
          }
        }
      },
      logout: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "logout",
          }
        }
      },
      signup: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "signup",
          }
        }
      },
      all_tests: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "all",
          }
        }
      },

    },

    shell: {
      options: {
        stdout: true
      },
      install:{
        command:'npm install'
      },
      webdriver_update: {
        command: 'node node_modules/webdriver-manager/bin/webdriver-manager update'
      }
    },

});


  /// GRUNT PLUGIN LOAD ///

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-shell');


  /// SHELL TASKS ///

  grunt.registerTask('install', ['shell:install']);
  grunt.registerTask('update', ['shell:webdriver_update']);


  /// INDIVIDUAL TASKS ///

  grunt.registerTask('default', ['protractor:full']);

  grunt.registerTask('elements', function (env) {
   grunt.task.run(['protractor:elements']);
  });

  grunt.registerTask('login', function (env) {
    grunt.task.run(['protractor:login']);
   });

   grunt.registerTask('logout', function (env) {
    grunt.task.run(['protractor:logout']);
   });

  grunt.registerTask('signup', function (env) {
    grunt.task.run(['protractor:signup']);
   });

   grunt.registerTask('all_tests', function (env) {
    grunt.task.run(['protractor:all_tests']);
   });



};
