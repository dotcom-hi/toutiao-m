module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        // 作用： 把 px 转为 rem
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置要转换的 css 属性
            propList: ['*'],

            exclude: 'github-markdown'
        }
    }
}