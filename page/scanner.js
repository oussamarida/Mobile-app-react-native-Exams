import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from "react-native-vector-icons/FontAwesome";
import apiUrl from "./api/url";


const Scannercode = ({ navigation, route }) => {
  const { items } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scannedData2, setScannedData2] = useState(null);
  const [scannedData3, setScannedData3] = useState(null);
  const [etu, setEtu] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const searchResult = items[0].tables.filter(
      (table) => table.etudiant.id === parseInt(data)
    );
    if (searchResult.length > 0) {
      const newTable = {
        absence: "P",
      };
      await fetch(`${apiUrl}tabs/${parseInt(searchResult[0].id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTable),
      });
    } else {
      setScannedData2('Not found in this class');
      try {
        const response = await fetch(`${apiUrl}etudiants/${parseInt(data)}`, {
          method: "GET",
        });
        const responseData = await response.json();
        setEtu(responseData);
      } catch (error) {
        console.error(error);
      }
      if (etu) {
        setScannedData3(etu);
        console.log(etu.id)
        try {
          const response = await fetch(`${apiUrl}salles/etudiant/${etu.id}`, {
            method: "GET",
          });
          const responseData = await response.json();
          setsalle(responseData[0].name);
        } catch (error) {
          console.error(error);
        }
      } 
    }
    setScannedData(searchResult);
  };

  const [sallee, setsalle] = useState('');
  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scannedDataContainer}>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Icon name="camera" style={styles.cameraIcon}></Icon>
          </TouchableOpacity>

          {scannedData && (
            <View style={styles.information}>
              {scannedData.map((data, index) => (
                <View key={index}>
                  <Text style={styles.label}>Etudiant(e):</Text>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>CNE:</Text>
                    <Text>{data.etudiant.cne}</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>ID:</Text>
                    <Text>{data.etudiant.id}</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Napo:</Text>
                    <Text>{data.etudiant.napo}</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Nom:</Text>
                    <Text>{data.etudiant.nom}</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Prenom:</Text>
                    <Text>{data.etudiant.prenom}</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Num table:</Text>
                    <Text>{data.num}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {scannedData2 && (
            <View style={styles.information}>
              <Text style={styles.label}>Etudiant(e):</Text>
              <View style={styles.dataRow}>
                <Text style={[styles.errorText , {color:'red'}]}>{scannedData2}</Text>
              </View>
              {scannedData3 ? (
                <View style={styles.dataRow}>
                  <Text style={[styles.errorText , {color:'black'}]}>Nom:{scannedData3.nom}</Text>
                  <Text style={[styles.errorText , {color:'black'}]}>Prenom:{scannedData3.prenom}</Text>
                  <Text style={[styles.errorText , {color:'black'}]}>Salle:{sallee}</Text>
                  
                </View>
              ) : (
                <View style={styles.dataRow}>
                
                  <Text style={styles.errorText}>Not in Emsi Or   <Text style={[styles.errorText, {color:'blue'}]}>Or Check Again</Text> </Text>
                </View>
              )}
            </View>
          )}

          {scannedData === null && <Text>Scanning...</Text>}
          {scannedData !== null && scannedData.code === 'jsonError' && (
            <Text>Error: {scannedData.message}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scannedDataContainer: {
    height: "90%",
    width: "100%",
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 10,
  },
  cameraIcon: {
    fontSize: 60,
    marginLeft: "80%",
  },
  information: {
    flex: 1,
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 25,
  },
  dataRow: {
    marginBottom: 20,
  },
  dataLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
    fontSize: 25,
    marginLeft: 0,
  },
});

export default Scannercode;
