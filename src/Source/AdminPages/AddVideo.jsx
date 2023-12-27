import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import TextEditor from "./Component/TextEditor";


export default function AddVideo() {
    const [content, setContent] = useState()
    return (<Box p={10} >
        <Heading>Add Video</Heading>
        <TextEditor setContent={setContent} content={content} placeholder={'typing'} />
        <Box>
            {content}
        </Box>
    </Box>)    
}