
export type User = {
    id: string;
    agentCode: string
    fullName: string
    passwordHash: string
    role: "agent" | "admin"
    createdAt: string
}
