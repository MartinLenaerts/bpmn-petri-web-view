import {useRef, useState} from "react";
import Diagram from "@/pages/diagram";
import styles from '@/styles/index.module.css'
import {Box, Button, Heading, IconButton} from "@chakra-ui/react";
import {ArrowBackIcon, DownloadIcon} from '@chakra-ui/icons'

export default function Home() {
    const initialState = {bpmn: null, petri_txt: null, petri_img: null}
    const [diagram, setDiagram] = useState(initialState);

    const hiddenFileInput = useRef(null)

    const handleUpload = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': '*/*'
                },
                body: i
            })


            const result = await response.json()
            const reader = new FileReader()
            reader.readAsText(i, "UTF-8");
            reader.onload = function (evt) {

                const diagramResult = {
                    bpmn: evt.target.result,
                    petri_img: null,
                    petri_txt: null
                }

                if (response.status === 200) {
                    diagramResult.petri_img = result.img
                    diagramResult.petri_txt = result.txt
                }

                setDiagram(diagramResult)
            }
        }
    }

    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    const goBack = () => {
        setDiagram(initialState)
    }

    return (
        <>
            <Box m={"1rem"}>
                {diagram.bpmn ?
                    <>
                        <Box><Button leftIcon={<ArrowBackIcon/>} onClick={goBack}>Back</Button></Box>
                        <Diagram diagram={diagram.bpmn} petri_img={diagram.petri_img} petri_txt={diagram.petri_txt}/>
                    </>
                    :
                    <>
                        <Box className={styles.container}>
                            <Heading>Select a BPMN file</Heading>
                            <IconButton onClick={handleClick} icon={<DownloadIcon/>} aria-label={"Upload"}/>
                            <input type={"file"} accept={".bpmn, .xml"} style={{display: 'none'}} ref={hiddenFileInput}
                                   onChange={handleUpload}/>
                        </Box>
                    </>
                }
            </Box>
        </>
    )
}
