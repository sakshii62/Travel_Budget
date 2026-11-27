export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p className="muted">{message}</p>
    </div>
  );
}