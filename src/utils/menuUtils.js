export const filterMenuOptions = (menuItems, userRole, currentSystem) => {
  const filterMenu = (menuItem) => {
    // 检查是否显示、角色权限及系统匹配
    const shouldShow = menuItem.meta?.show && menuItem.meta?.role?.includes(userRole) && menuItem.meta?.system === currentSystem
    if (!shouldShow) return null

    const option = {
      label: menuItem.meta.title,
      key: `/pages/${menuItem.path}`,
      path: menuItem.path,
      icon: menuItem.meta.icon || null,
    }

    if (menuItem.children && menuItem.children.length > 0) {
      const filteredChildren = menuItem.children.map((child) => filterMenu(child)).filter((child) => child !== null)

      if (filteredChildren.length > 0) {
        option.children = filteredChildren.map((child) => ({
          ...child,
          path: child.path,
          key: `${option.key}/${child.path}`,
        }))
      } else {
        return null // 如果没有子菜单，则不显示父菜单
      }
    }

    return option
  }

  return menuItems.map((menuItem) => filterMenu(menuItem)).filter((menuItem) => menuItem !== null)
}
