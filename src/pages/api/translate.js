import {writeFile, mkdir, readFile} from "fs/promises";
import util from "util";

const exec = util.promisify(require('node:child_process').exec)

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {

            const now = Date.now()
            const dirname = `${process.env.UPLOAD_DIR}/${now}`

            await mkdir(dirname, {recursive: true})

            const filename = `${dirname}/${now}.bpmn`

            await writeFile(filename, req.body);

            await exec(`cd ${process.env.PYTHON_PROJECT_PATH} && python3 main.py -f ${filename} -k`);

            const txt = await readFile(`${dirname}/${now}.txt`, {encoding: 'utf8'})
            const img = Buffer.from(await readFile(`${dirname}/${now}.png`)).toString('base64')

            res.status(200).json({
                img: img,
                txt: txt
            })
        } catch (e) {
            res.status(500).send({error:"ERROR"})
        }
    } else {
        res.status(404)
    }
}
