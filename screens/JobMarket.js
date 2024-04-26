import { View,Text,ScrollView,StyleSheet } from "react-native";
import { useState } from "react";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { styles } from "../Style/screenStyles/JobMarketStyle";

export default function JobMarket(){
    const techJobs = [
        {
          job: "Software Engineer",
          enterprise: "TechCorp",
          require: " Excellent C++, Python,Java",
          salary: "9,000 USD",
          rate: "6.5%"
        },
        {
          job: "Data Scientist",
          enterprise: "DataTech Solutions",
          require: "Machine learning algorithms",
          salary: "3,500 USD",
          rate: "7.2%"
        },
        {
          job: "UX/UI Designer",
          enterprise: "DesignWorks",
          require: "Strong design skills",
          salary: "8,000 USD",
          rate: "5.8%"
        },
        {
          job: "Cybersecurity Analyst",
          enterprise: "SecureNet",
          require: "Network security protocols",
          salary: "2,000 USD",
          rate: "6.0%"
        },
        {
          job: "Product Manager",
          enterprise: "InnovateTech",
          require: "5 years experience",
          salary: "5,000 USD",
          rate: "7.5%"
        },
        {
          job: "DevOps Engineer",
          enterprise: "CloudTech Solutions",
          require: "Cloud computing proficiency",
          salary: "3,500 USD",
          rate: "6.8%"
        }
      ];
      

    const [selectedJob, setSelectedJob] = useState(null); // Track currently selected job
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = (job) => {
        setSelectedJob(job); // Set the selected asset before opening modal
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedJob(null); // Clear selected job on close
    };
    
    const renderJD = (enterprise,require,salary,rate)=>{
        return(
            <View style={styles.JDContainer}>
                <Text><Text style={styles.label}>Enterprise:</Text> {enterprise}</Text>
                <Text><Text style={styles.label}>Requirement:</Text> {require}</Text>
                <Text><Text style={styles.label}>Salary:</Text> {salary}</Text>
                <Text><Text style={styles.label}>Rate:</Text> {rate}</Text>
            </View>
        )
      }
    
    return(
        <ScrollView style={styles.container}>
            <View style={styles.list}>
             {techJobs.map((jobs)=>(
                <Card
                    key={jobs.job}
                    barHidden={true}
                    showDetail={true}
                    onPress={()=>openModal(jobs)}
                >
                    {jobs.job}
                    
                </Card>
             ))}   
            </View>
            <AlertPopup
                modalVisible={modalVisible}
                closeModal={closeModal}
                title={selectedJob?.job}
                content={renderJD(
                    selectedJob?.enterprise,
                    selectedJob?.require,
                    selectedJob?.salary,
                    selectedJob?.rate,
                )}
                buttonText={"Apply now"}
            />
        </ScrollView>
    )
}

