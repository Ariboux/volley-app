import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Team } from "@/constants/Types";
import { URL_API } from "@/constants/Values";
import { useRouter } from "expo-router";

const ChooseTeam = () => {
  const [teams, setTeams] = useState([] as Team[]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(URL_API + "/api/teams");
        const data = await response.json();
        setTeams(data);
        setLoading(false);

        const storedTeam = await AsyncStorage.getItem("selectedTeam");
        if (storedTeam) setSelectedTeam(JSON.parse(storedTeam));
      } catch (error) {
        console.error("Erreur lors du fetch des teams :", error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const saveTeam = async (team: Team) => {
    try {
      await AsyncStorage.setItem("selectedTeam", JSON.stringify(team));
      setSelectedTeam(team);
      router.replace("/");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du team :", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre team :</Text>
      <FlatList
        data={teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.teamItem,
              selectedTeam === item && styles.selectedTeam,
            ]}
            onPress={() => saveTeam(item)}
          >
            <Text style={styles.teamText}>
              {item.group}/{item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  teamItem: { padding: 12, borderWidth: 1, borderRadius: 4, marginBottom: 8 },
  selectedTeam: { backgroundColor: "#cce5ff", borderColor: "#007bff" },
  teamText: { fontSize: 16 },
});

export default ChooseTeam;
