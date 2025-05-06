export const workflow = [
  {
    "event.id": "-1843743290896097469_1745403051227V2",
    "event.end": "2025-04-23T10:20:56.383000000Z",
    timestamp: "2025-04-23T10:21:02.378000000Z",
    display_id: "P-25045532",
    "event.kind": "DAVIS_PROBLEM",
    "event.name": "Http monitor outage",
    entity_tags: ["HealthCheck:Yes"],
    "event.start": "2025-04-23T10:10:51.227000000Z",
    "event.status": "CLOSED",
    "event.category": "AVAILABILITY",
    "event.description":
      "# Http monitor outage\n\nThe problem **affects 1 entity** overall.\n\nFollowing entities were affected by the problem:\n\n**HTTP monitor, Health - Agent-Data-service - NA**\n\nAvailability: Http monitor local outage\n\n- Response status code rules violated, 200: OK from Mumbai\n\nAvailability: Http monitor global outage\n\n- Response status code rules violated, 200: OK from Mumbai",
    "dt.davis.event_ids": [
      "-1843743290896097469_1745403051227",
      "3109512991383239362_1745403051227",
    ],
    affected_entity_ids: ["HTTP_CHECK-A68D5F5B3B51255F"],
    "dt.davis.mute.status": "NOT_MUTED",
    "dt.entity.http_check": ["HTTP_CHECK-A68D5F5B3B51255F"],
    affected_entity_types: ["dt.entity.http_check"],
    "dt.davis.is_duplicate": false,
    "event.status_transition": "UPDATED",
    "labels.alerting_profile": ["Default"],
    resolved_problem_duration: "605156000000",
    "dt.davis.is_frequent_event": false,
    "dt.entity.synthetic_location": ["SYNTHETIC_LOCATION-0000000000000060"],
    "maintenance.is_under_maintenance": false,
  },
  {
    "event.id": "7202533004136562547_1745403060137V2",
    "event.end": "2025-04-23T10:21:16.217000000Z",
    timestamp: "2025-04-23T10:21:22.516000000Z",
    display_id: "P-25045533",
    "event.kind": "DAVIS_PROBLEM",
    "event.name": "Http monitor outage",
    entity_tags: ["HealthCheck:Yes"],
    "event.start": "2025-04-23T10:11:00.137000000Z",
    "event.status": "CLOSED",
    "event.category": "AVAILABILITY",
    "event.description":
      "# Http monitor outage\n\nThe problem **affects 1 entity** overall.\n\nFollowing entities were affected by the problem:\n\n**HTTP monitor, Health - Agent-Data-service - EU**\n\nAvailability: Http monitor global outage\n\n- Response status code rules violated, 200: OK from Mumbai\n\nAvailability: Http monitor local outage\n\n- Response status code rules violated, 200: OK from Mumbai",
    "dt.davis.event_ids": [
      "1791037838777003674_1745403060137",
      "7202533004136562547_1745403060137",
    ],
    affected_entity_ids: ["HTTP_CHECK-833C078F2380004E"],
    "dt.davis.mute.status": "NOT_MUTED",
    "dt.entity.http_check": ["HTTP_CHECK-833C078F2380004E"],
    affected_entity_types: ["dt.entity.http_check"],
    "dt.davis.is_duplicate": false,
    "event.status_transition": "UPDATED",
    "labels.alerting_profile": ["Default"],
    resolved_problem_duration: "616080000000",
    "dt.davis.is_frequent_event": false,
    "dt.entity.synthetic_location": ["SYNTHETIC_LOCATION-0000000000000060"],
    "maintenance.is_under_maintenance": false,
  },
  {
    "event.id": "7202533004136562547_1745403060137V2",
    "event.end": "2025-04-23T10:21:16.217000000Z",
    timestamp: "2025-04-23T10:21:22.516000000Z",
    display_id: "P-25045533",
    "event.kind": "DAVIS_PROBLEM",
    "event.name": "Http monitor outage",
    entity_tags: ["HealthCheck:Yes"],
    "event.start": "2025-04-23T10:11:00.137000000Z",
    "event.status": "CLOSED",
    "event.category": "AVAILABILITY",
    "event.description":
      "# Http monitor outage\n\nThe problem **affects 1 entity** overall.\n\nFollowing entities were affected by the problem:\n\n**HTTP monitor, Emergency - Partner-service - AU**\n\nAvailability: Http monitor global outage\n\n- Response status code rules violated, 200: OK from Mumbai\n\nAvailability: Http monitor local outage\n\n- Response status code rules violated, 200: OK from Mumbai",
    "dt.davis.event_ids": [
      "1791037838777003674_1745403060137",
      "7202533004136562547_1745403060137",
    ],
    affected_entity_ids: ["HTTP_CHECK-833C078F2380004E"],
    "dt.davis.mute.status": "NOT_MUTED",
    "dt.entity.http_check": ["HTTP_CHECK-833C078F2380004E"],
    affected_entity_types: ["dt.entity.http_check"],
    "dt.davis.is_duplicate": false,
    "event.status_transition": "UPDATED",
    "labels.alerting_profile": ["Default"],
    resolved_problem_duration: "616080000000",
    "dt.davis.is_frequent_event": false,
    "dt.entity.synthetic_location": ["SYNTHETIC_LOCATION-0000000000000060"],
    "maintenance.is_under_maintenance": false,
  },
];

export default async function ({ executionId }) {
  try {
    const ex = await execution(executionId);
    const problemList = await ex.result("execute_dql_query_1");

    console.log("Type of problemList:", typeof problemList);
    console.log("problemList contents:", JSON.stringify(problemList, null, 2));

    const result = [];
    const records = problemList?.records;
    for (const event of records) {
      const description = event["event.description"] || "";
      console.log("Event description:", description);

      // Match Category, Service, and Region dynamically using regex
      const regex = /\*\*.*?, (.*?) - (.*?) - (.*?)\*\*/g;
      let match;

      while ((match = regex.exec(description)) !== null) {
        const category = match[1].trim();
        const service = match[2].trim();
        const region = match[3].trim();

        console.log("Extracted Category:", category);
        console.log("Extracted Service:", service);
        console.log("Extracted Region:", region);

        result.push({ category, service, region });
      }
    }

    console.log("Final extracted details:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error extracting details:", error);
  }
}
