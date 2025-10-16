import { createCompany, getCompanyById } from '../../src/services/company.service';
import { CompanyModel, syncDb } from '../../src/models';

describe('Company Service', () => {

  beforeAll(async () => {
    await syncDb();
    // clear all companies before tests
    await CompanyModel.destroy({ where: {} });
  });

  test('should create and retrieve a company', async () => {
    const companyData = {
      fullName: 'Test Company',
      address: '123 Test St',
      email: 'companytest@email.com',
      phone: '9234567890',
      isVerified: true,
    };

    const adminData = {
      fullName: 'Admin',
      email: 'admin@company.com',
      password: 'securepassword',
    };

    const createdCompany = await createCompany(companyData, adminData);
    console.log('Created Company:', createdCompany);
    expect(createdCompany).toMatchObject(companyData);

    const fetchedCompany = await CompanyModel.findByPk(createdCompany.id);
    expect(fetchedCompany).toBeDefined();
    expect(fetchedCompany?.toJSON()).toMatchObject(companyData);
  });
});