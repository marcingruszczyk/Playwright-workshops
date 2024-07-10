import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  transferMessage = this.page.locator('#show_messages');
  closeButton = this.page.getByTestId('close-button');

  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topUpCheckBox = this.page.locator('#uniform-widget_1_topup_agreement span');
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  availableMoney = this.page.locator('#money_value');

  async makeTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiver.selectOption(topUpReceiver);
    await this.topUpAmount.fill(topUpAmount);
    await this.topUpCheckBox.click();
    await this.topUpButton.click();
    await this.closeButton.click();
  }

  async makeTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
  }
}
