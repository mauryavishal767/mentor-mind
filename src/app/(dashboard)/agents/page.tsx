import LoadingState from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentsListHeaders } from "@/modules/agents/ui/components/agents-list-header";
import { AgentsView, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
    const session = await auth.api.getSession({
            headers: await headers(),
        })
    
        if(!session){
            redirect('/sign-in');
        }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    return(
    <>
        <AgentsListHeaders />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <AgentsView/>
            </Suspense>
        </HydrationBoundary>
    </>
    );
}

export default Page;