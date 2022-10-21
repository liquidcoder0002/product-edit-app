import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

import {
  Card,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
  FormLayout,
  Pagination,
} from "@shopify/polaris";
import { Button, Modal, TextContainer, TextField } from "@shopify/polaris";
import {
  DropZone,
  Stack,
  Thumbnail,
  Caption,
  Banner,
  List,
} from "@shopify/polaris";

const ProFetch = () => {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState([]);
  const [id1, setid] = useState('');
  const [NextL, setnextL] = useState('');
  const [PrevL, setprevL] = useState('');
  const app = useAppBridge();
  const buttonRef = useRef(null);

  const [active1, setActive1] = useState(false);

  const buttonRef1 = useRef(null);

  const handleOpen1 = useCallback(() => {
    console.log("flag001");
    setActive1(true);
    

  }, []);

  const handleClose1 = useCallback(() => {
    setActive1(false);

  }, []);

  
  const getCustomers = async () => {

    const token = await getSessionToken(app);
    
    const res = await axios.get(`/api/product1-grapgql`, {
      headers: {
        Authorization: "Bearer " + token,
      }
      
    });
    console.log(res.data.body.data.products.edges)
    setCount(res.data.body.data.products.edges)
    
  };


  const getpagination = async (abc) => {

    const token = await getSessionToken(app);

    const res1 = await axios.get(`/api/product-pagination?${abc}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    console.log('respoooos===========>',abc)
    // setCount(res1.data[0].products);
    const nextLink = res1.data[1].link
    console.log('links===========>',nextLink.includes("previous"))
    console.log('links vv===========>',nextLink)
    if(nextLink.includes("previous") == true){
      console.log("if prev",nextLink.split(",")[1].split(";")[0].split("<")[1].split(">")[0].split("&")[1]);
      setnextL(nextLink.split(",")[1].split(";")[0].split("<")[1].split(">")[0].split("&")[1])
      
    }else{
        console.log("if next",nextLink.split(";")[0].split("<")[1].split(">")[0].split("&")[1])
        setnextL(nextLink.split(";")[0].split("<")[1].split(">")[0].split("&")[1])
    }

    if(nextLink.includes("previous") == true ){
      console.log("if prev linkkkk===>",nextLink.split(",")[1].split(";")[0].split("<")[1].split(">")[0].split("&")[1]);

      setprevL(nextLink.split(";")[0].split("<")[1].split(">")[0].split("&")[1])
    }

    // if(nextLink.includes(`next`) == true){
    //   setnextL(nextLink.split(";")[0].split("<")[1].split(">")[0].split("&")[1])
    //   console.log('links if ===========>',NextL)
      
      
    // }else{
    //   console.log('links else===========>',NextL)
    //   setnextL(nextLink.split(";")[0].split("<")[1].split(">")[0].split("&")[1])

    // }
  };


  const [input1, setInput1] = useState({
    // id:id1,
    first_name1: '',
    last_name1: "",
    price1: "",
  });
  const inputEvent2 = (e, key) => {
    setInput1({ ...input1, [key]: e });
  };

  const inpData1 = {
    fname1: input1.first_name1,
    lname1: input1.last_name1,
    price_up: input1.price1,
  };

  const [input, setinput] = useState({
    first_name: "",
    last_name: "",
  });
  const inputEvent = (e, key) => {
    setinput({ ...input, [key]: e });
  };
  const inpData = {
    fname: input.first_name,
    lname: input.last_name,
  };
  
  const getCustomers2 = async () => {
    const token = await getSessionToken(app);
    console.log("token======>", token);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inpData),
    };
    try {
      const res = await axios.post("/api/products", inpData, config);
      
      console.log("objj", res);
    } catch (error) {
      console.log("Error", error);
    }
  };
  
  useEffect(() => {
    getCustomers();
    getpagination()
  }, []);
  
  const createpro = () => {
    getCustomers();
    handleClose();
    getCustomers2();
    console.log("first");
  };
  
  const deletfun = async (id) => {
    const token = await getSessionToken(app);
    console.log("token======>", token);
    console.log("id", id.toString());
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.delete(`/api/delete-products/${id}`, config);
      
    } catch (error) {
      console.log("Error", error);
    }
    getCustomers();
  };
  
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;
  
  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      window.URL.handleDrop(files[0]);
      console.log("_droped", _droppedFiles);
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    []
    );
    
    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && (
      <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
            />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );
  
  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
      >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
  
const updateData = {input1}
  const updatebtn = async (id1) => {
    const token = await getSessionToken(app);
    console.log("token======>", inpData1);
    console.log("id", id1.toString());
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      body:JSON.stringify(inpData1)
    };
    
    try {
      const res = await axios.put(`/api/update-products/${id1}`,inpData1, config);
      console.log("objj=======>", res.data);
      setActive1(false);
      console.log("hel========>",input1,id1);
    } catch (error) {
      console.log("Error", error);
    }
    getCustomers();
  };

  const DISCOUNT_LINK = "https://polaris.shopify.com/";

  const node = useRef(null);

  const handleClick = useCallback(() => {
    node.current && node.current.input.focus();
  }, []);

  const handleFocus = useCallback(() => {
    if (node.current == null) {
      return;
    }
    node.current.input.select();
    document.execCommand("copy");
  }, []);

  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const activator = (
    <div>
      <Button onClick={toggleModal}>Create Product</Button>
    </div>
  );

  const activator1 = (
    <div className="f1">
      <Button onClick={handleOpen1 }>Update Details</Button>
    </div>
  );

  return (
    <>
      {activator}
      <br></br>
      <Card>
        <div>
          <Modal
            activator={buttonRef}
            open={active}
            onClose={handleClose}
            title="Insert New Product Deatils"
            primaryAction={{
              content: "Create Product",
              onAction: createpro,
              // onClick: createpro,
            }}
            secondaryActions={[
              {
                content: "Cancle",
                onAction: handleClose,
              },
            ]}
          >
            <Modal.Section>
              {/* <FormLayout>
          <TextField label="Length" onChange={() => {}} autoComplete="off"></TextField>
        </FormLayout> */}
              <FormLayout>
                <TextField
                  label="Name"
                  onChange={(e) => {
                    inputEvent(e, "first_name");
                    console.log(e);
                  }}
                  value={input.first_name}
                />
                <TextField
                  label="vendor"
                  onChange={(e) => {
                    inputEvent(e, "last_name");
                  }}
                  value={input.last_name}
                />
                <Stack vertical>
                  {errorMessage}
                  <DropZone accept="image/*" type="image" onDrop={handleDrop}>
                    {uploadedFiles}
                    {fileUpload}
                  </DropZone>
                </Stack>
              </FormLayout>
            </Modal.Section>
          </Modal>
        </div>
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          items={count}
          renderItem={(item) => {
            const { id, title, variants, image,node } = item;
            // console.log(variants[0]?.price)
            return (
              <>
                <ResourceItem
                  id={node.id}
                  media={
                    <Avatar
                      customer
                      size="medium"
                      name={node.title}
                      source={image?.src}
                    />
                  }
                  accessibilityLabel={`View details for ${node.title}`}
                  name={node.title}
                >
                  <h3>
                    <TextStyle variation="strong">{node.title}</TextStyle>
                  </h3>
                  <h3>
                    <TextStyle variation="strong">{node.title}</TextStyle>
                  </h3>
                  <h6>
                    <TextStyle variation="strong">
                      {/* ${node.variants[0]?.price} */}
                    </TextStyle>
                  </h6>
                  <h6>
                    <TextStyle variation="strong">{node.id}</TextStyle>
                  </h6>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button primary onClick={() => deletfun(node.id)}>
                      Delete
                    </Button>

                    <div
                      id={node.id}
                      style={{ height: "auto" }}
                      onClick={() => {
                        setid(node.id);
                        console.log("id1 ste=====>",id1)

                      }}
                    >
                      {activator1}
                    </div>
                  </div>
                </ResourceItem>
              </>
            );
          }}
        />
        <div style={{ marginTop:'20px',display: 'flex',justifyContent: "center" }}>
          <Pagination
            hasPrevious
            onPrevious={() => {
              console.log("Previous");
              getpagination(PrevL)
              console.log(PrevL)
            }}
            hasNext
            onNext={() => {
              console.log("Next");
              getpagination(NextL)
              const NLink = NextL
              console.log(NextL)
              
            }}
          />
        </div>
      </Card>

      <Modal
        activator={buttonRef1}
        open={active1}
        onClose={handleClose1}
        title="UPdate YOur DEtails"
        primaryAction={{
          content: "Update product",
          onAction:() =>{updatebtn(id1)} ,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction:handleClose1 ,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <FormLayout>
              <TextField
                label="Name"
                onChange={(e) => {
                  inputEvent2(e,'first_name1');
                  console.log(input1.first_name1);
                }}
                value={input1.first_name1}
              />
              <TextField
                label="vendor"
                onChange={(e) => {
                  inputEvent2(e, "last_name1");
                }}
                value={input1.last_name1}
              />
              <TextField
                label="price"
                onChange={(e) => {
                  inputEvent2(e, "price1");
                }}
                value={input1.price1}
              />
              <Stack vertical>{errorMessage}</Stack>
            </FormLayout>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
};
export default ProFetch;
