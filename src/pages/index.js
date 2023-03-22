import Head from 'next/head'
import {useRef, useState} from "react";
import Diagram from "@/pages/diagram";
import styles from '@/styles/index.module.css'
import {Box, Button, Heading, IconButton} from "@chakra-ui/react";
import {ArrowBackIcon, DownloadIcon} from '@chakra-ui/icons'

export default function Home() {
    const [diagram, setDiagram] = useState({bpmn: null});

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

            if (response.ok) {
                const result = await response.json()
                const reader = new FileReader()
                reader.readAsText(i, "UTF-8");
                reader.onload = function (evt) {
                    setDiagram({
                        bpmn: evt.target.result,
                        petri_img: result.img,
                        petri_txt: result.txt
                    })
                }

            }
        }
    }

    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    const goBack = () => {
        setDiagram({bpmn: null})
    }

    return (
        <>
            <Box m={"1rem"}>
                {!!diagram.bpmn ?
                    <>
                        <Box><Button leftIcon={<ArrowBackIcon/>} onClick={goBack}>Back</Button></Box>
                        <Diagram diagram={diagram.bpmn} petri_img={diagram.petri_img} petri_txt={diagram.petri_txt}/>
                    </>
                    :
                    <>
                        <Box className={styles.container}>
                            <Heading>Select a BPMN file</Heading>
                            <IconButton onClick={handleClick} icon={<DownloadIcon/>}/>
                            <input type={"file"} accept={".bpmn, .xml"} style={{display: 'none'}} ref={hiddenFileInput}
                                   onChange={handleUpload}/>
                        </Box>
                    </>
                }
            </Box>
        </>
    )
}
