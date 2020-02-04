export function generateUserRole(user) {
  let markup = `
    <div class="edit-profile-role-icon">
      <img src="/icons/user.svg" />
    </div>
    <p class="heading4" style="margin-bottom: 4px;">
      This is a regular user account.
    </p>
    <p class="medium" style="margin-bottom: 12px;">
      A regular account can only publish and manage it's own articles and profile info.
    </p>
    <button data-id="${user.id}" data-current="user" class="button button--medium primary change-user-role">
      Upgrade to Admin
    </button>
  `

  return markup
}

export function generateAdminRole(user) {
  let markup = `
    <div class="edit-profile-role-icon">
      <img src="/icons/admin.svg" />
    </div>
    <p class="heading4" style="margin-bottom: 4px;">This account has an admin privilege.</p>
    <p class="medium" style="margin-bottom: 12px;">
      An admin can manage all contents (articles, events, and galleries) and change users role.
    </p>
    <button data-id="${user.id}" data-current="admin" class="button button--medium primary change-user-role">
      Downgrade to Regular User
    </button>
    `

  return markup
}
