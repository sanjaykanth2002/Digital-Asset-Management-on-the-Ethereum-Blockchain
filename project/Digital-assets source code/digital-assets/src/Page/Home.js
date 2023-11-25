import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
   const [RegHash, setRegHash] = useState("");
   
   const [PubHash, setPubHash] = useState("");


   const [UnPubHash, setUnPubHash] = useState("");


   const [TransferHash, setTransferHash] = useState("");
   const [Addr, setAddr] = useState("");
   const [Wallet, setWallet] = useState("");

   

   const [gId, setGIds] = useState("");
   const [Details, setDetails] = useState("");

 
   // const handlePolicyNumber = (e) => {
   //    setNumber(e.target.value)
   // } 

   const handleRegHash = (e) => {
      setRegHash(e.target.value)
   } 
   

   const handleRegAsset = async () => {
      try {
         let tx = await contract.registerAsset(RegHash)
         let wait = await tx.wait()
         alert(wait.transactionHash)
         console.log(wait);
      } catch (error) {
         alert(error)
      }
   }


   const handlePublishHash = (e) => {
      setPubHash(e.target.value)
   }
  

   const handlePublish = async () => {
      try {
         let tx = await contract.publishAsset(PubHash)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)   
      }
   }

   const handleUnPublishHash = (e) => {
      setUnPubHash(e.target.value)
   }


   const handleUnPublish = async () => {
      try {
         let tx = await contract.unpublishAsset(UnPubHash)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }

   const handleTransferHash = (e) => {
      setTransferHash(e.target.value)
   }

   const handleAddr = (e) => {
      setAddr(e.target.value)
   }

   const handleTransfer = async () => {
      try {
         let tx = await contract.transferOwnership(TransferHash, Addr)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }

   

   
   const handleGetIds = async (e) => {
      setGIds(e.target.value)
   }

   const handleGetDetails = async () => {
      try {
         let tx = await contract.digitalAssets(gId.toString())
         
         let arr = []
         tx.map(e => {
            arr.push(e)
         })
         
         console.log(tx);
         setDetails(arr)
      } catch (error) {
         alert(error)
         console.log(error);
      }
   }

   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Digital Asset Registry on Blockchain</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>



     <Col style={{marginRight:"100px"}}>
      <div>
         {/* <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handlePolicyNumber} type="string" placeholder="Policy number" value={number} /> <br /> */}
      <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleRegHash} type="string" placeholder="Assets Hash" value={RegHash} /> <br />
       <Button onClick={handleRegAsset} style={{ marginTop: "10px" }} variant="primary">Register Asset</Button>
      </div>
     </Col>

      <Col style={{ marginRight: "100px" }}>
         <div>
            <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handlePublishHash} type="string" placeholder="Asset Hash" value={PubHash} /> <br />
                   
            <Button onClick={handlePublish} style={{ marginTop: "10px" }} variant="primary"> Publish Assets</Button>
         </div>
      </Col> 
           
               
   </Row>    
   <Row style={{marginTop:"100px"}}>
             <Col style={{ marginRight: "100px" }}>
                <div>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleUnPublishHash} type="string" placeholder="Assets Hash" value={UnPubHash} /> <br />
                   
                   <Button onClick={handleUnPublish} style={{ marginTop: "10px" }} variant="primary">  Unpublish Assets</Button>
                </div>
             </Col> 


             <Col style={{ marginRight: "100px" }}>
                <div>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleTransferHash} type="string" placeholder="Asset Hash" value={TransferHash} /> <br />
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleAddr} type="string" placeholder="Owner metamask address" value={Addr} /> <br />


                   <Button onClick={handleTransfer} style={{ marginTop: "10px" }} variant="primary"> Transfer Ownership</Button>
                </div>
             </Col> 

             
       </Row>
          <Row style={{ marginTop: "50px" }}>
             <Col style={{ marginRight: "100px" }}>
                <div style={{ margin: "auto", marginTop: "100px" }}>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleGetIds} type="string" placeholder="Enter Assets Hash" value={gId} /><br />

                   <Button onClick={handleGetDetails} style={{ marginTop: "10px" }} variant="primary">Get Digital Assets</Button>
                   {Details ? Details?.map(e => {
                      return <p>{e.toString()}</p>
                   }) : <p></p>}
                </div>
             </Col>   
   </Row>
   </Container>

  </div>
 )
}

export default Home;
