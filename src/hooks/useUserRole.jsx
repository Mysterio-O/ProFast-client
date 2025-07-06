import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {

    const { user, loading: AuthLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user);

    const { data: role = "user", isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}/role`)
            return res.data?.role
        }
    })

    console.log(role);


    return {role, role_loading: AuthLoading || roleLoading, refetch }
};

export default useUserRole;