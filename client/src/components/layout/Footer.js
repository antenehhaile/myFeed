import React from "react";
import styles from "../../App.css";
export default function Footer() {
  return (
    <footer className="bg-dark mt-5 p-4 text-center footer-style">
      Copyright &copy; {new Date().getFullYear()} MyFeed
    </footer>
  );
}
