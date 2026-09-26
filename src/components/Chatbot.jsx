import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, RotateCcw, X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import contactData from "../data/contact.json";
import { currentMarketSlot, formatTime, isMarketOpen, todayName } from "../utils/marketUtils";
import { useNow } from "../hooks/useNow";

const normalizeQuestion = (value) => String(value || "")
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\s]/gu, "")
  .replace(/\s+/g, " ")
  .trim();

const CHAT_HISTORY_KEY = "freshfind_chat_history";
const WELCOME_MESSAGE = { role: "bot", text: "Hi! How can I help you with FreshFind today?" };

function loadChatHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || "null");
    return Array.isArray(saved) && saved.length ? saved : [WELCOME_MESSAGE];
  } catch {
    return [WELCOME_MESSAGE];
  }
}

export default function Chatbot() {
  const { chatbot, markets, produce, marketNames, locationStatus, selectedLocation, userLocation } = useAppData();
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState(loadChatHistory);
  const quickReplies = chatbot;
  const [input, setInput] = useState("");
  const logRef = useRef(null);
  const navigate = useNavigate();
  const now = useNow();

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(log));
    } catch {
      // Keep the conversation available for this session if storage is unavailable.
    }
  }, [log]);
  useEffect(() => {
    if (!open || !logRef.current) return;
    requestAnimationFrame(() => {
      logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
    });
  }, [log, open]);

  const seasonalProduceAnswer = () => {
    const month = now.getMonth();
    const season = month === 11 || month <= 1 ? "winter" : month <= 4 ? "spring" : month <= 7 ? "summer" : "fall";
    const seasonal = produce.filter((item) => {
      const category = item.category.toLowerCase();
      return (category === "fruits" || category === "vegetables") && item.season.toLowerCase().includes(season);
    });
    const names = seasonal.map((item) => item.name).join(", ");
    return names
      ? `Current season: ${season}. Seasonal produce in the guide: ${names}.`
      : `Current season: ${season}. There are no matching seasonal fruits or vegetables in the guide.`;
  };

  const locationAnswer = () => {
    if (locationStatus === "loading") return "Yes. FreshFind is checking your browser location permission now.";
    if (locationStatus === "granted" || userLocation) return "Yes. FreshFind is using your browser's approximate location to calculate nearby market distances.";
    if (locationStatus === "selected" || selectedLocation) return "Yes. FreshFind can use the delivery location you selected in the browser to calculate nearby market distances.";
    if (locationStatus === "denied") return "Yes. FreshFind uses browser geolocation when permission is granted. Permission is currently denied, but the website still works without it.";
    if (locationStatus === "unavailable") return "Yes. FreshFind uses the browser geolocation feature when available. This browser currently does not provide it.";
    return "Yes. FreshFind uses the browser's built-in geolocation feature. Choose an address or use live location on the Contact page; no backend is required.";
  };

  const answerFor = (match) => {
    switch (match.responseType) {
      case "open-markets": {
        const openMarkets = markets.filter((market) => isMarketOpen(market, now));
        if (!openMarkets.length) return { text: "No markets are currently open." };
        const lines = openMarkets.map((market) => {
          const slot = currentMarketSlot(market, now);
          return `- ${market.name} - Open until ${formatTime(slot.close)}`;
        });
        return { text: `Markets open now:\n${lines.join("\n")}`, destination: "#/markets?status=open" };
      }
      case "seasonal-produce":
        return { text: seasonalProduceAnswer(), destination: "#/produce" };
      case "location":
        return { text: locationAnswer(), destination: "#/contact" };
      case "contact":
        return {
          text: `Contact FreshFind at ${contactData.email} or ${contactData.phone}. Address: ${contactData.address.join(" ")}.`,
          destination: "#/contact"
        };
      default:
        return { text: "I can help with FreshFind questions about markets, produce, seasons, and locations." };
    }
  };

  const answerFreeform = (question) => {
    const clean = normalizeQuestion(question);
    const greeting = /^(hi|hello|hey|salam|assalamualaikum|good morning|good afternoon|good evening|aoa)(\s|$)/.test(clean);
    if (greeting) return { text: "Hi! How can I help you with FreshFind today?" };
    if (clean.includes("can you help") || clean.includes("how can you help") || clean === "help") {
      return { text: "Of course! I can help you explore local markets, check market availability, find seasonal produce, and answer questions about FreshFind." };
    }
    if (clean.includes("what can you do") || clean.includes("what do you do")) {
      return { text: "I can help you find local markets, check which markets are open, explore seasonal fruits and vegetables, and provide information available in FreshFind." };
    }
    const nameMatch = clean.match(/^(?:my name is|i am|im)\s+(.+)$/);
    if (nameMatch) {
      const name = nameMatch[1].replace(/\s+/g, " ").trim().split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      return { text: `Nice to meet you, ${name}! How can I help you today?` };
    }
    if (clean.includes("thank") || clean.includes("shukriya")) return { text: "You're welcome! Let me know if you need anything else." };
    if (clean === "ok" || clean === "okay" || clean.includes("alright")) return { text: "Great! What would you like to explore in FreshFind?" };
    if (clean.includes("how are you") || clean.includes("kaise ho") || clean.includes("kya haal")) return { text: "I am doing well and ready to help you discover fresh markets and produce." };
    if (clean === "bye" || clean.includes("goodbye") || clean.includes("allah hafiz")) return { text: "Goodbye! Come back whenever you want to explore FreshFind." };
    if (clean.includes("contact") || clean.includes("email") || clean.includes("phone")) return answerFor({ responseType: "contact" });
    if (clean.includes("location") || clean.includes("nearby") || clean.includes("near me")) return answerFor({ responseType: "location" });
    if ((clean.includes("open") || clean.includes("available")) && clean.includes("market")) return answerFor({ responseType: "open-markets" });
    if (clean.includes("season") || clean.includes("seasonal")) return answerFor({ responseType: "seasonal-produce" });

    const marketMatch = markets.find((market) => clean.includes(normalizeQuestion(market.name)) || clean.includes(normalizeQuestion(market.neighborhood)));
    if (marketMatch) {
      const openNow = isMarketOpen(marketMatch, now);
      const slot = openNow ? currentMarketSlot(marketMatch, now) : null;
      const todaySlot = marketMatch.schedule.find((item) => item.day === todayName(now));
      const scheduleText = todaySlot
        ? `Today's hours are ${formatTime(todaySlot.open)} to ${formatTime(todaySlot.close)}.`
        : "It is not scheduled to open today.";
      return {
        text: `${marketMatch.name} is at ${marketMatch.address}. It is ${openNow ? `open until ${formatTime(slot.close)}` : "not open right now"}. ${scheduleText} It carries ${produce.filter((item) => marketMatch.products.includes(item.id)).map((item) => item.name).join(", ")}.`,
        destination: `#/markets/${marketMatch.id}`
      };
    }

    const requestedCategory = clean.includes("fruit") ? "Fruits" : clean.includes("vegetable") ? "Vegetables" : clean.includes("dairy") || clean.includes("milk") ? "Dairy" : "";
    const productMatch = produce.find((item) => clean.includes(normalizeQuestion(item.name)) || (item.id === "strawberry" && clean.includes("strawber")));
    if (productMatch) {
      return { text: `${productMatch.name} is a ${productMatch.category.toLowerCase()} item, usually available in ${productMatch.season}. You can find it at ${marketNames(productMatch.markets)}.`, destination: `#/produce/${productMatch.id}` };
    }
    if (requestedCategory) {
      const items = produce.filter((item) => item.category === requestedCategory);
      return { text: `FreshFind lists these ${requestedCategory.toLowerCase()}: ${items.map((item) => item.name).join(", ")}.`, destination: "#/produce" };
    }
    if (clean.includes("what information") || clean.includes("what is available") || clean.includes("available information")) {
      return { text: "FreshFind has information about local markets, market schedules and locations, seasonal produce, fruits, vegetables, and dairy.", destination: "#/markets" };
    }
    if (clean.includes("market")) return { text: `FreshFind has ${markets.length} local markets: ${markets.map((market) => market.name).join(", ")}.`, destination: "#/markets" };
    if (clean.includes("price") || clean.includes("cost")) return { text: "FreshFind does not currently include price fields, but I can help you find products and the markets that carry them." };
    return { text: "I'm here to help with FreshFind and its local market and produce information. I don't have enough information to answer that question, but you can ask me about markets, seasonal produce, or FreshFind." };
  };

  const respond = (message, selectedMatch = null) => {
    const clean = String(message || "").trim();
    if (!clean) return;
    const match = selectedMatch || chatbot.find((item) => (
      String(item.question).trim() === clean || normalizeQuestion(item.question) === normalizeQuestion(clean)
    ));
    const response = match ? answerFor(match) : answerFreeform(clean);
    setLog((prev) => [...prev, { role: "user", text: clean }, { role: "bot", ...response }]);
    requestAnimationFrame(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    });
  };

  const resetChat = () => {
    setLog([WELCOME_MESSAGE]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {
      // The visible conversation still resets for this session.
    }
  };

  const handleDestination = (event, destination) => {
    event.preventDefault();
    navigate(destination.replace(/^#/, ""));
  };

  return (
    <aside className={`chatbot${open ? " is-open" : ""}`} aria-label="FreshFind chatbot">
      <button className="chat-launcher" type="button" aria-label="Chat with FreshFind helper" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <MessageCircle size={32} strokeWidth={1.8} />
      </button>
      {open ? (
        <section className="chat-window">
          <header>
            <h2>FreshFind helper</h2>
            <div className="chat-header-actions">
              <button className="chat-reset" type="button" aria-label="Reset Chat" title="Reset Chat" onClick={resetChat}><RotateCcw size={15} /> <span>Reset Chat</span></button>
              <button className="icon-btn" type="button" aria-label="Close chatbot" title="Close chatbot" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
          </header>
          <div className="chat-log" role="log" aria-live="polite" ref={logRef}>
            {log.map((entry, index) => (
              <div key={index} className={entry.role === "bot" ? "bot-bubble" : "user-bubble"}>
                {entry.text}{" "}
                {entry.destination ? (
                  <a className="chat-related-link" href={entry.destination} onClick={(event) => handleDestination(event, entry.destination)}>
                    Open related page
                  </a>
                ) : null}
              </div>
            ))}
          </div>
          <div className="quick-replies">
            {quickReplies.map((reply) => (
              <button key={reply.id} type="button" onClick={() => respond(reply.question, reply)}>
                {reply.question}
              </button>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              respond(input);
              setInput("");
            }}
          >
            <label className="sr-only" htmlFor="chat-input">
              Ask FreshFind
            </label>
            <input
              id="chat-input"
              name="message"
              autoComplete="off"
              placeholder="Type a question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="solid-btn small" type="submit">
              Send
            </button>
          </form>
        </section>
      ) : null}
    </aside>
  );
}
