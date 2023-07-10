import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let { userId } = useParams();

  const [documents, setDocuments] = useState();
  console.log(userId);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const data = await fetch(
          `http://localhost:3002/api/v1/document/getAllDocuments/${userId}`
        );

        const response = await data.json();
        console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error:", error); // Handle any errors that occurred during the request
      }
      console.log(documents);
    };
    getDocuments();
  }, []);

  const handleOnClick = async () => {
    navigate("/newDocument");
  };

  return (
    <section className="container home">
      <button className="new-button" onClick={handleOnClick}>
        new document
      </button>
      <p>recent documents</p>
      <div className="recent-documents">
        {documents &&
          documents.map((document) => (
            <Link key={document._id} to={`/documents/${document._id}`}>
              <div className="document-card">{document.data.ops.insert}</div>
            </Link>
          ))}
      </div>
    </section>
  );
}
