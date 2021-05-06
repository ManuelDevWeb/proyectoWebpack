/*
    Aca almacenamos toda la configuracion que necesitaremos para nuestro proyecto
*/

const path = require('path');
//Añadir el recurso de HTMLwebpack
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Añadir el recurso de CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Añadir el recurso de Copy
const CopyPlugin = require('copy-webpack-plugin');
//Añadir el recurso de Minimizer
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//Añadir el recurso de Terser
const TerserPlugin = require('terser-webpack-plugin');
//Añadir el recurso de Dontenv
const Dontenv = require('dotenv-webpack');
//Añadir el recurso de Clean
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//Modulo de un objeto con la configuracion deseada
module.exports = {
    //Punto de entrada de nuestra aplicación
    entry: './src/index.js',
    //Punto de salida
    output: {
        //Permite saber en que directorio esta nuestro proyecto
        path: path.resolve(__dirname, 'dist'),
        //Nombre del resultante de JS
        filename: '[name].[contenthash].js',
        //Esta instrucción hace que webpack le agregue un hash ( un hash es una serie de caracteres aleatorios) y su extencion por medio de esas variables en el string
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        //Extensiones que vamos a utilizar
        extensions: ['.js'],
        //Alias que usaremos
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        //Reglas que establecemos para trabajar con diferentes tipos de archivos
        rules: [{
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza cualquier extension que sea mjs o js (mjs es la extension de modulos)
            test: /\.m?js$/,
            //Excluir elementos de node_modules
            exclude: /node_modules/,
            //Pasar internamente el loader que utilizaremos (babel)
            use: {
                loader: 'babel-loader'
            }
        }, {
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza cualquier extension que sea css
            test: /\.css|.styl$/i,
            //Indicamos que elementos vamos a tener
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ]
        }, {
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza archivos png
            test: /\.png/,
            //Para poder importar los recursos en el template
            type: 'asset/resource'
        }, {
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza woff o woff2
            test: /\.(woff|woff2)$/,
            //Indicamos que elementos vamos a tener
            use: {
                loader: 'url-loader',
                //Configuraciones necesarias
                options: {
                    //Tamaño
                    limit: 10000,
                    //Tipo de dato
                    mimetype: "application/font-woff",
                    //Nombre que queremos, en este caso respeta nombre y extension que tienen por defecto
                    name: "[name].[contenthash].[ext]",
                    //Hacia donde enviamos los archivos (output o bundle)
                    outputPath: "./assets/fonts/",
                    //Directorio publico
                    publicPath: "../assets/fonts/",
                    //Avisar explicitamente si es un modulo
                    esModule: false
                }
            }
        }]
    },
    plugins: [
        //Instancia plugin de HTML
        new HtmlWebpackPlugin({
            //Configuracion del plugin
            //Inject para hacer la inserccion de los elementos
            inject: true,
            //Ubicacion del index.html para transformarlo con los elementos que le indiquemos
            template: './public/index.html',
            //Salida de la preparación de HTML a partir del template
            filename: './index.html'
        }),
        //Instancia plugin de CSS
        new MiniCssExtractPlugin({
            //Salida del resultante
            filename: 'assets/[name].[contenthash].css'
        }),
        //Instancia plugin de Copy
        new CopyPlugin({
            patterns: [{
                //Donde se encuentran los archivos
                from: path.resolve(__dirname, "src", "assets/images"),
                //Hacia donde moveremos los archivos (output o bundle)
                to: "assets/images"
            }]
        }),
        //Instancia plugin Dontenv
        new Dontenv(),
        //Instancia plugin Clean
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        //Configuracion de minimize
        minimizer: [
            //Instancia plugin Minimize y Terser
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }


}