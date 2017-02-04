module.exports = function(grunt){
    grunt.initConfig({
        babel: {
            options: {
                presets: ["es2015", "stage-3"]
            },
            dist: {
                files: {
                    "dist/UTFSnow.js": "dev/UTFSnow.js"
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    "dist/UTFSnow.min.js" : ["dist/UTFSnow.js"]
                }
            }
        },

        watch: {
            scripts: {
                files: ["dev/UTFSnow.js"],
                tasks: ["babel", "minify"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["babel"]);
    grunt.registerTask("minify", ["uglify"]);
}