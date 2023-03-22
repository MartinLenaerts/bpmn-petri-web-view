import {useEffect, useState} from "react";
import Viewer from "bpmn-js"
import {Box, Code, Divider, Heading, Image} from "@chakra-ui/react";

export default function Diagram(props) {

    const [height, setHeight] = useState("0")
    const [marginLeft, setMarginLeft] = useState("0")
    const [width, setWidth] = useState("0")
    useEffect(() => {


        document.getElementById("bpmn_container").innerHTML = ""
        const viewer = new Viewer({
            container: '#bpmn_container'
        });

        const importXMLAndResize = async () => {
            await viewer.importXML(props.diagram)
            const y = document.querySelector("g.viewport").getBBox().y
            const h = document.querySelector("g.viewport").getBBox().height
            setHeight(`${h + y}px`)

            const x = document.querySelector("g.viewport").getBBox().x
            const w = document.querySelector("g.viewport").getBBox().width
            setMarginLeft(`-${x}px`)
            setWidth(`-${w + x}px`)
        }

        importXMLAndResize().then(r => console.log(r))


    }, [props])


    return (
        <Box m={"2rem"}>
            <Box>
                <Heading>BPMN Diagram</Heading>
                <Box id={"bpmn_container"} h={height} ml={marginLeft} w={width}></Box>
            </Box>
            <Divider m={"2rem"}/>
            <Box>
                <Heading>Petri Net</Heading>
                <Box id={"petri"} display={"flex"} flexDirection={"column"} alignItems={"center"}
                     justifyContent={"space-around"}>
                    <Box>
                        <Image src={"data:image/png;base64," + props.petri_img} alt={"petri net image"}/>
                    </Box>
                    <Code p={"2rem"} style={{whiteSpace: "pre-wrap"}}>{props.petri_txt}</Code>
                </Box>
            </Box>
        </Box>
    )
}
