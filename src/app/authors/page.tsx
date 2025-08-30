"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { logout } from "../actions/auth";
import Button from "../ui/button";

export default function Page() {
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    const response = await axios.get("/api/authors");
    setAuthors(response.data);
  };
  useEffect(() => {
    getAuthors();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
      <div>
        <strong>Authors</strong>
        <ul className="list-disc pl-4">
          {authors.map((author) => {
            return (
              <li key={author.id}>
                <div>
                  {author.firstName} {author.lastName}
                  <ul className="list-disc list-inside">
                    {author.books?.length > 0 && <strong>Books</strong>}
                    {author.books.map((book) => {
                      return <li key={book.id}>{book.title}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <Button onClick={logout} submitText="Logout" />
        </div>
      </div>
    </div>
  );
}
