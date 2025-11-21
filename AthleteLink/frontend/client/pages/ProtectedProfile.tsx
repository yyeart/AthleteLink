import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}
