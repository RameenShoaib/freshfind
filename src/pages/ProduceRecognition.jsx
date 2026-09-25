import { useEffect, useRef, useState } from "react";
import { Camera, CircleAlert, Leaf, LoaderCircle, MapPin, ScanSearch, Upload, X } from "lucide-react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { useAppData } from "../context/AppDataContext";
import SectionHeading from "../components/SectionHeading";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const LABEL_ALIASES = {
  apple: ["apple", "granny smith"],
  strawberry: ["strawberry"],
  tomato: ["tomato"],
  spinach: ["spinach"],
  carrot: ["carrot"],
  potato: ["potato"],
  banana: ["banana"],
  orange: ["orange"],
  lemon: ["lemon"],
  pineapple: ["pineapple"],
  broccoli: ["broccoli"],
  cauliflower: ["cauliflower"],
  cabbage: ["cabbage", "head cabbage"],
  zucchini: ["zucchini"],
  pepper: ["bell pepper", "pepper"],
  squash: ["squash", "acorn squash", "butternut squash"]
};
const CATEGORY_BY_ID = {
  apple: "Fruit",
  strawberry: "Fruit",
  banana: "Fruit",
  orange: "Fruit",
  lemon: "Fruit",
  pineapple: "Fruit",
  tomato: "Vegetable",
  spinach: "Vegetable",
  carrot: "Vegetable",
  potato: "Vegetable",
  broccoli: "Vegetable",
  cauliflower: "Vegetable",
  cabbage: "Vegetable",
  zucchini: "Vegetable",
  pepper: "Vegetable",
  squash: "Vegetable"
};

function matchProduct(label, produce) {
  const cleanLabel = label.toLowerCase();
  const matchId = Object.keys(LABEL_ALIASES).find((id) => LABEL_ALIASES[id].some((alias) => cleanLabel.includes(alias)));
  return {
    id: matchId || null,
    item: matchId ? produce.find((entry) => entry.id === matchId) || null : null,
    category: CATEGORY_BY_ID[matchId] || null
  };
}

export default function ProduceRecognition() {
  const { produce, marketNames } = useAppData();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const imageRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const handleFile = (event) => {
    const selected = event.target.files?.[0];
    setResult(null);
    setMessage("");
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFile(null);
      setPreview("");
      setStatus("error");
      setMessage("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus("ready");
  };

  const recognize = async () => {
    if (!file || !imageRef.current) {
      setStatus("error");
      setMessage("Please upload an image before analyzing it.");
      return;
    }
    setStatus("loading");
    setMessage("");
    setResult(null);
    try {
      modelRef.current ||= await mobilenet.load();
      const predictions = await modelRef.current.classify(imageRef.current, 5);
      const bestPrediction = predictions.find((prediction) => matchProduct(prediction.className, produce).category);
      if (!bestPrediction) {
        setStatus("result");
        setResult({ label: predictions[0]?.className || "Unknown item", category: null, item: null });
        return;
      }
      const match = matchProduct(bestPrediction.className, produce);
      setStatus("result");
      setResult({ label: bestPrediction.className, category: match.category, item: match.item });
    } catch {
      setStatus("error");
      setMessage("We could not analyze this image right now. Please try a clear JPG, PNG, or WebP image.");
    }
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setResult(null);
    setMessage("");
    setStatus("idle");
  };

  return (
    <>
      <section className="page-hero compact">
        <SectionHeading
          eyebrow="Produce Recognition"
          eyebrowIcon={ScanSearch}
          title="Identify fresh produce"
          subtitle="Upload a fruit or vegetable image and match the recognition result with FreshFind's real produce and market data."
          doodle="See it.\nFind it."
          art="/assets/art-basket.jpg"
          animate
        />
      </section>
      <section className="section recognition-section">
        <div className="recognition-layout">
          <article className="panel recognition-upload-card">
            <div className="recognition-heading"><Camera size={22} /><div><span className="card-label">IMAGE ANALYSIS</span><h2>Upload a clear image</h2></div></div>
            <label className="recognition-dropzone" htmlFor="produce-image">
              {preview ? <img ref={imageRef} src={preview} alt="Selected produce for recognition" /> : <><Upload size={32} /><strong>Choose an image</strong><span>JPG, PNG, or WebP</span></>}
            </label>
            <input id="produce-image" className="sr-only" type="file" accept={ACCEPTED_TYPES.join(",")} onChange={handleFile} />
            <div className="recognition-actions">
              <label className="ghost-btn recognition-file-button" htmlFor="produce-image"><Upload size={17} /> {file ? "Choose another image" : "Upload image"}</label>
              {file ? <button className="icon-btn recognition-clear" type="button" aria-label="Clear image" title="Clear image" onClick={clearImage}><X size={17} /></button> : null}
              <button className="solid-btn recognition-submit" type="button" disabled={status === "loading"} onClick={recognize}>{status === "loading" ? <><LoaderCircle className="spin" size={17} /> Analyzing...</> : <><ScanSearch size={17} /> Recognize produce</>}</button>
            </div>
            {message ? <p className="recognition-error" role="alert"><CircleAlert size={17} /> {message}</p> : null}
          </article>
          <article className="panel recognition-result-card" aria-live="polite">
            {status === "loading" ? <div className="recognition-placeholder"><LoaderCircle className="spin" size={38} /><h2>Analyzing your image</h2><p>The vision model is checking the image before matching it with FreshFind.</p></div> : result ? (
              <div className="recognition-result">
                <span className="card-label">RECOGNITION RESULT</span>
                <h2>Detected: {result.label}</h2>
                {result.category ? <p className="recognition-category">Category: <strong>{result.category}</strong></p> : null}
                {result.item ? (
                  <>
                    <div className="recognition-match"><Leaf size={20} /><strong>Available in FreshFind: Yes</strong></div>
                    <p>{result.item.description}</p>
                    <div className="recognition-facts"><span><strong>Season</strong>{result.item.season}</span><span><MapPin size={16} /><strong>Markets</strong>{marketNames(result.item.markets)}</span></div>
                  </>
                ) : <div className="recognition-not-found"><CircleAlert size={20} /><p>This item was recognized, but it is not currently available in FreshFind's dataset.</p></div>}
              </div>
            ) : <div className="recognition-placeholder"><ScanSearch size={42} /><h2>Your result will appear here</h2><p>Upload an image, then select Recognize produce to begin.</p></div>}
          </article>
        </div>
        <p className="recognition-note">Recognition runs in your browser. No image is uploaded to a third-party API, and FreshFind information is shown only when it matches the existing JSON data.</p>
      </section>
    </>
  );
}
