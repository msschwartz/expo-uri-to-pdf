import { useEvent } from "expo";
import ExpoUriToPdf, { ExpoPdfView, uriToPdf } from "expo-uri-to-pdf";
import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  const onChangePayload = useEvent(ExpoUriToPdf, "onChange");
  const [result, setResult] = useState<{ uri: string }>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
        </Group>
        <Group name="Async functions">
          <Button
            title="URI to PDF"
            onPress={async () => {
              setResult(await uriToPdf("https://msschwartz.github.io/"));
            }}
          />
        </Group>
        <Group name="Views">
          {!!result?.uri && (
            <ExpoPdfView
              uri={result.uri}
              onLoad={({ nativeEvent: { uri } }) => console.log(`Loaded: ${uri}`)}
              style={styles.view}
            />
          )}
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
