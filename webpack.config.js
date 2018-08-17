
const config = {
    // devtool: 'eval-source-map',
    entry:{
        practiceList:__dirname + "/app/js/practiceList.js",
        PracticeInterface:__dirname + "/app/js/PracticeInterface.js",
        wrongList:__dirname + "/app/js/wrongList.js",
        wrongAnswer:__dirname + "/app/js/wrongAnswer.js",
        wrongInterface:__dirname + "/app/js/wrongInterface.js",
        examPaperInterface:__dirname + "/app/js/examPaperInterface.js",
        examPaperScore:__dirname + "/app/js/examPaperScore.js",
        examPaperAnswer:__dirname + "/app/js/examPaperAnswer.js",
        simulationInterface:__dirname + "/app/js/simulationInterface.js",
        simulationScore:__dirname + "/app/js/simulationPaperScore.js",
        simulationAnswer:__dirname + "/app/js/simulationPaperAnswer.js",
        simulationParsing:__dirname + "/app/js/simulationParsing.js",
        ranking:__dirname + "/app/js/ranking.js",
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'element-ui': 'element-ui/lib/index.js',
            'vuex': 'vuex/dist/vuex.js',
            'axios': 'axios/dist/axios.js',
            'jquery': 'jquery/dist/jquery.js',
            'vue-touch': 'vue-touch/dist/vue-touch.js',
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options:{
                    name:'[name].[ext]?[hash]'
                }
            }
        ]
    }
}
module.exports = config;