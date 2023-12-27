import { } from 'react'
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function Members({ member }) {
  // console.log('==member==>', member)
    return (
      <Tr key={member._id} >
        <Td>
          {<Image src={member.image} w={['50px']} borderRadius={"50%"} />}
        </Td>
        <Td>{member.name}</Td>
        <Td>{member.phone}</Td>
        <Td> {member.userType?member.userType:'Basic'} </Td>
      </Tr>
    );
}