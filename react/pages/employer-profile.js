import Layout from '../components/layout'

import EmployerProfile from '../components/EmployerProfile';

export default ({ url }) => (
    <Layout title="Employer Profile">
        <EmployerProfile username={url.query.profile_id} />
    </Layout>
)
