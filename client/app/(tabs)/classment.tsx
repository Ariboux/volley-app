import { Classement, Team } from "@/constants/Types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { URL_API } from "@/constants/Values";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabClassmentScreen() {
  const [classement, setClassement] = useState<Classement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassement = async () => {
      try {
        const storedTeam = await AsyncStorage.getItem("selectedTeam");

        if (!storedTeam) {
          console.error("Aucune équipe sélectionnée");
          setLoading(false);
          return;
        }

        const team: Team = JSON.parse(storedTeam);
        const response = await fetch(`${URL_API}/api/classment/${team.group}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setClassement(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du classement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassement();
  }, []);
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classement</Text>
      <FlatList
        data={classement}
        keyExtractor={(item: Classement) => item.rank.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{item.rank}.</Text>
            <Text style={styles.team}>{item.team}</Text>
            <Text style={styles.points}>{item.points} pts</Text>
            <Text style={styles.games}>({item.games} joués)</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rank: {
    fontWeight: "bold",
  },
  team: {
    flex: 1,
    marginLeft: 10,
  },
  points: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  games: {
    fontStyle: "italic",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
