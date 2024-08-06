import {useState} from "react";
import { Box, Heading, Flex, Input, Stack, Image, Textarea, Button, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { PostRequest } from "../Services/ApiCall";

export default function Report() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const { name } = useSelector((state) => state.User)
  const [isLoading, setLoading] = useState(false)
  const [reportDetail, setReportDetail] = useState({
    name:name,email:'',report:'',subject:''
  })

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation
    let result = emailRegex.test(email);
    console.log('===>', result)
    return result
  }

  function ReportKro() {

    if (reportDetail.name.length == 0) {
      toast({
        title: 'Please Enter Your Name',
        status: 'error',
        duration: 3000
      })
      return
    }
    if (!validateEmail(reportDetail.email)) {
      if (reportDetail.email.length == 0) {
         toast({
           title: "Please Enter Your eamil",
           status: "error",
           duration: 3000,
         });
      } else {
         toast({
           title: "Please Enter Valid eamil",
           status: "error",
           duration: 3000,
         });
      }
      
       return;
    }
    if (reportDetail.subject.length == 0) {
      toast({
        title: "Please Enter Subject",
        status: "error",
        duration: 3000,
      });

      return 
    }
    if (reportDetail.report.length == 0) {
       toast({
         title: "Please Enter Your Message",
         status: "error",
         duration: 3000,
       });
      return 
    }
    setLoading(true)

    let data = {
      report: reportDetail.report,
      email: reportDetail.email,
      subject: reportDetail.subject,
    };

    
    PostRequest(`${url}report`, data).then((res) => {
      // console.log(res)
      if (res.status) {
          toast({
            title: "Report Sended",
            status: "success",
            duration: 3000,
          });
          setReportDetail({ ...reportDetail, subject: "", report: "" });
      } else {
        console.log("error", res);
             toast({
               title: "Something went Wrong!",
               status: "error",
               duration: 3000,
             });
      }
    }).catch((error)=>console.log(error))
    
    
    setLoading(false)
  }

  
  return (
    <Box >
      <Navbar />
      <Flex
        my={["20px", "30px"]}
        mx={"auto"}
        bg="white"
        w={["95%", "90%", "70%"]}
        h={["inherit", "100%", "100%"]}
        flexDir={["column", "column", "row", "row"]}
        px={["10px", "20px"]}
        py={["10px"]}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={10}
      >
        {/* headers and animations */}
        <Box w={["100%", "50%"]} m={["20px"]}>
          <Heading textAlign={"center"}>Let's talk about</Heading>
          <Heading textAlign={"center"}> everything!</Heading>
          <Flex w={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Image
              w="80%"
              src="https://65b52090c23cc3b62429bb24--joyful-kheer-008761.netlify.app/Accets/report.svg"
            />
          </Flex>
        </Box>

        {/* report input box */}

        <Box w={["100%", "80%", "50%"]}>
          <Stack spacing={3} px={[1, 10]}>
            <Input
              placeholder="Your Name"
              value={reportDetail.name}
              onChange={(e) =>
                setReportDetail({ ...reportDetail, name: e.target.value })
              }
            />
            <Input
              placeholder="Your Email"
              value={reportDetail.email}
              onChange={(e) =>
                setReportDetail({ ...reportDetail, email: e.target.value })
              }
            />
            <Input
              placeholder="Subject"
              value={reportDetail.subject}
              onChange={(e) =>
                setReportDetail({ ...reportDetail, subject: e.target.value })
              }
            />
            <Textarea
              value={reportDetail.report}
              onChange={(e) =>
                setReportDetail({ ...reportDetail, report: e.target.value })
              }
              placeholder={`Hi ${reportDetail.name}, enter your message here`}
            />
            <Button
              loadingText="Reporting..."
              isLoading={isLoading}
              bg="#2658e6"
              color={"white"}
              onClick={ReportKro}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
