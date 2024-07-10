import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class TransferPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.getByTestId('transfer_receiver');
  accountNumber = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  transferMessage = this.page.locator('#show_messages');

  async makeTransfer(
    receiverName: string,
    receiverAccountNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(receiverName);
    await this.accountNumber.fill(receiverAccountNumber);
    await this.transferAmount.fill(transferAmount);
    await this.transferButton.click();
    await this.closeButton.click();
  }
}
