import { useEffect } from 'react';
import { useLoading } from './LoadingContext'; 
export const useAxiosInterceptors = (api: any) => {
  const { setLoading } = useLoading(); 
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config: any) => {
      setLoading(true); 
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response: any) => {
        setLoading(false); // Desativa o carregamento
        return response;
      },
      (error: any) => {
        setLoading(false); // Desativa o carregamento mesmo em caso de erro
        return Promise.reject(error);
      }
    );

    // Limpeza dos interceptores para evitar vazamento de memória
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api, setLoading]); // Certifique-se de adicionar dependências corretas
};
