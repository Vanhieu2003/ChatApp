import { useAuthStore } from '@/stores/useAuthStore';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = useCallback(async () => {
    // có thể xảy ra khi refresh trang
    if (!accessToken) {
      await refresh();
    }

    const { accessToken: newAccessToken, user: currentUser } = useAuthStore.getState();
    if (newAccessToken && !currentUser) {
      await fetchMe();
    }

    setStarting(false);
  }, [accessToken, refresh, fetchMe]);

  useEffect(() => {
    init();
  }, [init]);

  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải trang...
      </div>
    );
  }

  if (!accessToken) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return <Outlet></Outlet>;
};


export default ProtectedRoute