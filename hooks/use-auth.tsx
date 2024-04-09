import { getData } from "@/storage/async-storage";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = await getData("token");
      console.log("Is auth hook: " + token);
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }
      setIsAuth(true);
      setIsLoading(false);
    })();
  }, []);

  return {
    isAuth,
    isLoading,
  };
};
