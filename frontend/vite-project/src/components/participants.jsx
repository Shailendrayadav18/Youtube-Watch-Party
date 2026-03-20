export default function Participants({ participants}) {
  return (
    <div className="participants" style={{ width: "300px" }}>
      <h3>Participants</h3>

      {Object.entries(participants).map(([id, user]) => (
        <div key={id}>
          <strong>{user.username}</strong> - {user.role}
        </div>
      ))}
    </div>
  );
}