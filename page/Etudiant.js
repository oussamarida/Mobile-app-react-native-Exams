import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ActivityIndicator, 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import apiUrl from "./api/url";
import { CheckBox } from 'react-native-elements';


export default function Etudiant({ navigation, route }) {
  const { item } = route.params;
  const { user } = route.params;
  const [items, setitems] = useState({});




  //model
  const [modalVisible, setModalVisible] = useState(false);
  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    onChangeNom("");
    onChangeprenom("");
    setEtudiant("");
  }
  //

  const [etudiant, setEtudiant] = useState([]);
  const [nom, onChangeNom] = useState("");
  const [prenom, onChangeprenom] = useState("");

  const Search = () => {
    const searchResult = item.tables.filter(
      (items) => items.etudiant.nom.toLowerCase() === nom.toLowerCase() && items.etudiant.prenom.toLowerCase() === prenom.toLowerCase()
    );
    if (searchResult.length > 0) {
      setEtudiant(searchResult[0]);
      const newuser = {
        absence: "P",
      };
      fetch(`${apiUrl}tabs/${parseInt(searchResult[0].id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newuser),
      });
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}salles/surveillant/${user}`, {
            method: "GET",
          });
          const responseData = await response.json();
          const searchResult = responseData.filter(
            (items) => items.code === item.code
          );
          setitems(searchResult);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchData();
    }
    
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}salles/surveillant/${user}`, {
          method: "GET",
        });
        const responseData = await response.json();
        const searchResult = responseData.filter(
          (items) => items.code === item.code
        );
        setitems(searchResult);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
   
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containers}
    >
      <ImageBackground
        style={styles.background}
        source={require("../assets/backdashbord.png")}
      >
        <View style={styles.Dashbord}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Scannercode",{items})} style={styles.item}>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "#E4E4E4",
                  borderRadius: 10000,
                  justifyContent: "center",
                  paddingLeft: "27%",
                }}
              >
                <Icon name="camera" style={styles.icon}></Icon>
              </View>
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 25,
                  marginLeft: "21%",
                  marginTop: "5%",
                  opacity: 0.63,
                  color: "#121212",
                }}
              >
                Scanner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} style={styles.item}>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "#E4E4E4",
                  borderRadius: 10000,
                  justifyContent: "center",
                  paddingLeft: "27%",
                }}
              >
                <Icon name="search" style={styles.icon}></Icon>
              </View>
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 25,
                  marginLeft: "25%",
                  marginTop: "5%",
                  opacity: 0.63,
                  color: "#121212",
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text
              style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}
            >
              {item.exam.matiere.nom}
            </Text>
            {/* Add your table here */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeaderCell}>CNE</Text>
                <Text style={styles.tableHeaderCell}>nom</Text>

                <Text style={styles.tableHeaderCell}>table</Text>
                <Text style={styles.tableHeaderCell}>absence</Text>
              </View>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  items[0].tables.map((row, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={styles.tableCell}>{row.etudiant.cne}</Text>
                      <Text style={styles.tableCell}>
                        {row.etudiant.nom} {row.etudiant.prenom}
                      </Text>
                      <Text style={styles.tableCell}>{row.num}</Text>
                      <Text style={styles.tableCell}>{row.absence}</Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
        style={[styles.item, { backgroundColor: "#E4E4E4" }]}
      >
        <View style={styles2.modalContainer}>
          <View style={styles2.modalContent}>
            <View style={styles2.searchBoX}>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeNom}
                value={nom}
                placeholder="nom"
              />
              <TextInput
                style={styles2.input}
                onChangeText={onChangeprenom}
                value={prenom}
                placeholder="prenom"
              />
            </View>
            <TouchableOpacity onPress={Search} style={styles2.containerse}>
              <Text name="search" style={{color:'white',fontSize: 20, fontWeight: "bold" }}>Search</Text>
            </TouchableOpacity>
            {etudiant && etudiant.etudiant && (
              <View style={{marginTop:40}}>
                <Text style={{fontWeight:'bold' , fontSize:15}}>Table: {etudiant.num}</Text>
                <Text style={{fontWeight:'bold' , fontSize:15}}>CNE: {etudiant.etudiant.cne}</Text>
                <Text style={{fontWeight:'bold' , fontSize:15}}>ID: {etudiant.etudiant.id}</Text>
                <Text style={{fontWeight:'bold' , fontSize:15}}>NAPO: {etudiant.etudiant.napo}</Text>
                <Text style={{fontWeight:'bold' , fontSize:15}}>
                  Nom: {etudiant.etudiant.nom} {etudiant.etudiant.prenom}
                </Text>
                <View  style={styles2.check}>
                <Text style={{marginTop:8,color:'red' ,fontWeight:'bold', fontSize:25}}>
                   Mark Present ✅ 
                </Text>
                </View>
              </View>
            )}

            <TouchableOpacity onPress={closeModal} style={styles2.closeButton}>
              <Text style={styles2.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles2 = StyleSheet.create({
  containerse: {
    backgroundColor: "rgba(54,8,64,1)",
    borderRadius: 100,
    width: 170,
    height: 60,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "20%",
    paddingLeft:"20%"
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginLeft: "80%",
    marginTop: 10,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
  searchBoX: {
    borderRadius: 40,
    marginBottom: 20,
    
  },
  input: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 40,
    marginRight: 10,
    marginBottom:10,
    marginVertical: 0,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    borderColor: "#8B15FF",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 100,
  },
  etudiant: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 40,
    marginBottom: 20,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    paddingTop: 40,
    justifyContent: "space-around",
  },
});

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1,
    padding: 20,
    borderRadius: 40,
    paddingTop: 50,
  },

  card: {
    flex: 7,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: "33%",
    paddingTop: 20,
  },
  profil: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 9000,
    width: 130,
    height: 130,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nom: {
    flex: 1,
    marginTop: 10,
  },
  Dashbord: {
    flex: 6,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
  },
  icon: {
    color: "#2E1D73",
    fontSize: 70,
  },
  icon2: {
    color: "#2E1D73",
    fontSize: 60,
    marginLeft: "70%",
  },
  icon3: {
    color: "white",
    fontSize: 50,
  },
  body: {
    flex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});
