import {useEffect, useState} from "react";
import Viewer from "bpmn-js"
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Code,
    Divider,
    Flex,
    Heading,
    Image
} from "@chakra-ui/react";

export default function Diagram(props) {

    const [height, setHeight] = useState("0")
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
            setWidth(`${w + x}px`)

            document.querySelector("a[title='Powered by bpmn.io']").style.display = "none"
        }

        importXMLAndResize().then(r => console.log(r))


    }, [props])


    return (
        <Box m={"2rem"}>
            <Box>
                <Heading>BPMN Diagram</Heading>
                <Flex>
                    <Box id={"bpmn_container"} m={"auto"} h={height} w={width}></Box>
                </Flex>
            </Box>
            <Divider m={"2rem"}/>
            <Box>
                <Heading>Petri Net</Heading>
                {
                    props.petri_txt && props.petri_img ?
                        <Box id={"petri"} display={"flex"} flexDirection={"column"} alignItems={"center"}
                             justifyContent={"space-around"}>
                            <Box>
                                <Image src={"data:image/png;base64," + props.petri_img} alt={"petri net image"}/>
                            </Box>
                            <Code p={"2rem"} style={{whiteSpace: "pre-wrap"}}>{props.petri_txt}</Code>
                        </Box>
                        :
                        <Flex>
                            <Alert variant='subtle'
                                   flexDirection='column'
                                   alignItems='center'
                                   justifyContent='center'
                                   textAlign='center'
                                   status='error'
                                   m={"auto"}
                                   w={"max-content"}
                                   p={"2rem"}
                            >
                                <AlertIcon boxSize='40px' mr={0}/>
                                <AlertTitle mt={4} mb={1} fontSize='lg'>Translation error !</AlertTitle>
                                <AlertDescription maxWidth='sm'>Unable to translate this BPMN
                                    diagram.</AlertDescription>
                            </Alert>
                        </Flex>
                }
            </Box>
        </Box>
    )
}
