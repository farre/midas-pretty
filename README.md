# Midas pretty printers.
This repository contains a collection of pretty printers for [the Midas Debug Adapter](https://github.com/farre/midas).

## Usage
To use these pretty printers you need to install the [Midas VSCode Debug Adapter Extension](https://marketplace.visualstudio.com/items?itemName=farrese.midas). Currently you need to use the pre-release version, so make sure to switch to that if needed. 

To make Midas aware of these pretty printers, clone this repository and edit your `launch.json` file to look something like:
```JSON
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "midas-rr",
            "request": "attach",
            "name": "Launch replay session",
            "use-dap": true,
            "trace": "Off",
            "cwd": "${workspaceFolder}",
            "setupCommands": [
                "set sysroot /",
                "set debuginfod enabled off",
                "set auto-load safe-path /"
            ],
            "prettyPrinterPath": "/path/to/midas-pretty/printers/"
        }
    ]
}
```
The important part is setting `"prettyPrinterPath` to point to the directory `printers` in the directory where you cloned this repository.
