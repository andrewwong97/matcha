import Layout from '../components/layout'

import StudentProfile from '../components/StudentProfile';

export default ({ url }) => (
    <Layout title="Student Profile">
        <StudentProfile username={url.query.profile_id} />
    </Layout>
)
