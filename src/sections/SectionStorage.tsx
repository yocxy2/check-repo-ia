import CheckerFile from "./CheckerFile"

export default function SectionStorage({ value:{files, user, repo} }: { value:{files: FileType[], user: string, repo: string} }) {

    return <CheckerFile files={files} user={user} repo={repo} />
}