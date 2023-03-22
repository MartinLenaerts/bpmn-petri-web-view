export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body)
        res.send({ok: "OK"})
    } else {
        res.status(404)
    }
}