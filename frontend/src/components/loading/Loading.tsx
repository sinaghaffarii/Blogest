import './style.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[100svh] mx-auto">
      <h1 className="text-3xl font-semibold">Loading...</h1>
      <div className="loader-section">
        <div className="loader-box">
          <span className="loader1"></span>
          <span className="loader2"></span>
          <span className="loader3"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
