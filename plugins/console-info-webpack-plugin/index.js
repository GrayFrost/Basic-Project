const path = require("path");
const fs = require("fs");
const figlet = require("figlet");


class ConsoleInfoWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const options = compiler.options;
        const { entry, context } = options;
        const indexEntries = entry.index; // 入口文件
        const pluginPath = path.resolve(
            __dirname,
            "./console-info-webpack-plugin.js"
        );
        if (Array.isArray(indexEntries)) {
            entry.index = indexEntries.unshift(pluginPath);
        } else {
            entry.index = [pluginPath, indexEntries];
        }
        this.changeContent(pluginPath)
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });

        compiler.hooks.entryOption.tap(
            "ConsoleInfoWebpackPlugin",
            (context, entry) => {
                console.log("zzh content", context, entry);
            }
        );

        compiler.hooks.done.tap("ConsoleInfoWebpackPlugin", (stats) => {});
    }

    changeContent(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, data) => {
                figlet.text("Hello World",{
                  font: 'Standard'
                }, (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // data = `console.log(${res})`;
                    fs.writeFile(filePath, data, "utf8", (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            });
        });
    }
}

module.exports = ConsoleInfoWebpackPlugin;
