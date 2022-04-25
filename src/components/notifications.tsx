export function achievementNotification(
  achievement_name: string,
  value: number,
  task: number
) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9698D6",
        borderLeft: "8px solid #4D4CAC",
      }}
    >
      <div>
        <h4>Achievement Unlocked</h4>
        <p>{achievement_name}</p>
        <p>
          {value} / {task}
        </p>
      </div>
    </div>
  );
}
